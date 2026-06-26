$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$OutDir = Join-Path $Root "assets\photos"
$SourceFile = Join-Path $Root "assets\image_sources.json"
New-Item -ItemType Directory -Force $OutDir | Out-Null

$ProxyArgs = @("--socks5-hostname", "127.0.0.1:7897")
$Queries = @(
  @{ slug = "hero-darkroom"; query = "photography darkroom film camera" },
  @{ slug = "camera-film"; query = "35mm film camera photography" },
  @{ slug = "contact-sheet"; query = "photography contact sheet" },
  @{ slug = "photo-book"; query = "photography book" },
  @{ slug = "street-camera"; query = "street photography camera" },
  @{ slug = "archive-table"; query = "photo archive contact prints" },
  @{ slug = "gallery-wall"; query = "photography exhibition gallery" },
  @{ slug = "portrait-studio"; query = "photography studio portrait camera" },
  @{ slug = "film-negative"; query = "photographic film negatives" },
  @{ slug = "research-desk"; query = "photo editing desk camera book" }
)

function Invoke-CurlText($Url) {
  $direct = & curl.exe -L --max-time 25 --silent --show-error $Url 2>$null
  if ($LASTEXITCODE -eq 0 -and $direct) {
    return $direct
  }
  return (& curl.exe -L --max-time 45 --silent --show-error @ProxyArgs $Url)
}

function Save-CurlFile($Url, $Path) {
  & curl.exe -L --max-time 40 --silent --show-error -o $Path $Url 2>$null
  if ($LASTEXITCODE -eq 0 -and (Test-Path $Path) -and ((Get-Item $Path).Length -gt 10000)) {
    return
  }
  Remove-Item $Path -Force -ErrorAction SilentlyContinue
  & curl.exe -L --max-time 70 --silent --show-error @ProxyArgs -o $Path $Url
}

function Get-Plain($Value) {
  if ($null -eq $Value) { return "" }
  if ($Value.PSObject.Properties.Name -contains "value") { return [string]$Value.value }
  return [string]$Value
}

$UsedTitles = @{}
$Results = @()

foreach ($Item in $Queries) {
  $encoded = [uri]::EscapeDataString($Item.query)
  $api = "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=$encoded&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url%7Cmime%7Csize%7Cextmetadata&iiurlwidth=1600"
  $json = Invoke-CurlText $api
  $data = $json | ConvertFrom-Json
  if (-not $data.query.pages) { continue }

  $pages = $data.query.pages.PSObject.Properties.Value
  $chosen = $null
  foreach ($page in $pages) {
    if ($UsedTitles.ContainsKey($page.title)) { continue }
    $info = $page.imageinfo[0]
    if (-not $info) { continue }
    if ($info.mime -notin @("image/jpeg", "image/png")) { continue }
    if ($info.width -lt 800 -or $info.height -lt 500) { continue }
    $chosen = $page
    break
  }
  if (-not $chosen) { continue }

  $UsedTitles[$chosen.title] = $true
  $info = $chosen.imageinfo[0]
  $ext = if ($info.mime -eq "image/png") { "png" } else { "jpg" }
  $file = "$($Item.slug).$ext"
  $path = Join-Path $OutDir $file
  $downloadUrl = if ($info.thumburl) { $info.thumburl } else { $info.url }
  Save-CurlFile $downloadUrl $path

  $meta = $info.extmetadata
  $Results += [ordered]@{
    file = "assets/photos/$file"
    query = $Item.query
    title = $chosen.title
    pageUrl = "https://commons.wikimedia.org/wiki/" + ($chosen.title -replace " ", "_")
    sourceUrl = $info.descriptionurl
    author = Get-Plain $meta.Artist
    license = Get-Plain $meta.LicenseShortName
    credit = Get-Plain $meta.Credit
    width = $info.width
    height = $info.height
  }
}

$Results | ConvertTo-Json -Depth 5 | Set-Content -Path $SourceFile -Encoding UTF8
$Results | ForEach-Object { "$($_.file)`t$($_.license)`t$($_.title)" }
