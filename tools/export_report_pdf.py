from pathlib import Path

import win32com.client


ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "output" / "doc" / "摄影创作研究助手-项目说明.docx"
PDF = ROOT / "output" / "doc_render" / "摄影创作研究助手-项目说明.pdf"


def main():
    PDF.parent.mkdir(parents=True, exist_ok=True)
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    try:
        doc = word.Documents.Open(str(DOCX.resolve()))
        doc.ExportAsFixedFormat(str(PDF.resolve()), 17)
        doc.Close(False)
    finally:
        word.Quit()
    print(PDF)


if __name__ == "__main__":
    main()
