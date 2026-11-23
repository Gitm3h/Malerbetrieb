from pathlib import Path

from PIL import Image
from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.table import WD_ALIGN_VERTICAL, WD_TABLE_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_TAB_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.opc.constants import RELATIONSHIP_TYPE
from docx.shared import Cm, Pt, RGBColor

DOCS = Path(__file__).resolve().parent
OUT = DOCS / "Malerbetrieb-Schmidt-README-DE.docx"

INK = RGBColor(8, 37, 39)
PETROL = RGBColor(14, 52, 55)
CHALK = RGBColor(242, 239, 230)
MUTED = RGBColor(88, 107, 106)
SAFFRON = RGBColor(243, 167, 18)
ULTRAMARINE = RGBColor(44, 75, 223)
WHITE = RGBColor(255, 255, 255)
BODY_FONT = "Calibri"
HEAD_FONT = "Georgia"
MONO_FONT = "Consolas"


def shade(element, fill):
    properties = element.get_or_add_tcPr() if hasattr(element, "get_or_add_tcPr") else element.get_or_add_pPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    properties.append(shd)


def set_cell_shading(cell, fill):
    tc_pr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), fill)
    tc_pr.append(shd)


def set_cell_margins(cell, top=120, start=140, bottom=120, end=140):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for margin, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{margin}"))
        if node is None:
            node = OxmlElement(f"w:{margin}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def paragraph_border(paragraph, color="F3A712", size=10, edge="bottom"):
    p_pr = paragraph._p.get_or_add_pPr()
    p_bdr = p_pr.find(qn("w:pBdr"))
    if p_bdr is None:
        p_bdr = OxmlElement("w:pBdr")
        p_pr.append(p_bdr)
    border = OxmlElement(f"w:{edge}")
    border.set(qn("w:val"), "single")
    border.set(qn("w:sz"), str(size))
    border.set(qn("w:space"), "6")
    border.set(qn("w:color"), color)
    p_bdr.append(border)


def add_hyperlink(paragraph, url, text, color="2C4BDF"):
    part = paragraph.part
    relationship_id = part.relate_to(url, RELATIONSHIP_TYPE.HYPERLINK, is_external=True)
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), relationship_id)
    run = OxmlElement("w:r")
    run_properties = OxmlElement("w:rPr")
    color_node = OxmlElement("w:color")
    color_node.set(qn("w:val"), color)
    run_properties.append(color_node)
    underline = OxmlElement("w:u")
    underline.set(qn("w:val"), "single")
    run_properties.append(underline)
    run.append(run_properties)
    text_node = OxmlElement("w:t")
    text_node.text = text
    run.append(text_node)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def add_page_field(paragraph, instruction):
    run = paragraph.add_run()
    begin = OxmlElement("w:fldChar")
    begin.set(qn("w:fldCharType"), "begin")
    run._r.append(begin)
    instr = OxmlElement("w:instrText")
    instr.set(qn("xml:space"), "preserve")
    instr.text = instruction
    run._r.append(instr)
    separate = OxmlElement("w:fldChar")
    separate.set(qn("w:fldCharType"), "separate")
    run._r.append(separate)
    run._r.append(OxmlElement("w:t"))
    end = OxmlElement("w:fldChar")
    end.set(qn("w:fldCharType"), "end")
    run._r.append(end)


def set_run_font(run, name=BODY_FONT, size=10.5, color=INK, bold=None, italic=None):
    run.font.name = name
    run.font.size = Pt(size)
    run.font.color.rgb = color
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic


def body(text, after=6, before=0, color=INK, size=10.5, italic=False):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_after = Pt(after)
    paragraph.paragraph_format.space_before = Pt(before)
    paragraph.paragraph_format.line_spacing = 1.15
    run = paragraph.add_run(text)
    set_run_font(run, size=size, color=color, italic=italic)
    return paragraph


def bullet(text, bold_lead=None):
    paragraph = document.add_paragraph(style="List Bullet")
    paragraph.paragraph_format.space_after = Pt(3)
    paragraph.paragraph_format.line_spacing = 1.1
    if bold_lead:
        lead = paragraph.add_run(bold_lead)
        set_run_font(lead, bold=True)
    run = paragraph.add_run(text)
    set_run_font(run, size=10.5)
    return paragraph


def section_heading(number, title, subtitle=None):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.space_before = Pt(18)
    paragraph.paragraph_format.space_after = Pt(4)
    paragraph.paragraph_format.keep_with_next = True
    number_run = paragraph.add_run(f"{number:02d}  ")
    set_run_font(number_run, HEAD_FONT, 10, ULTRAMARINE, bold=True)
    title_run = paragraph.add_run(title)
    set_run_font(title_run, HEAD_FONT, 19, INK, bold=True)
    if subtitle:
        sub = document.add_paragraph()
        sub.paragraph_format.space_after = Pt(8)
        sub.paragraph_format.keep_with_next = True
        sub_run = sub.add_run(subtitle)
        set_run_font(sub_run, size=10.5, color=MUTED, italic=True)
    paragraph_border(paragraph, color="2C4BDF", size=8)


def code_block(lines):
    paragraph = document.add_paragraph()
    paragraph.paragraph_format.left_indent = Cm(0.35)
    paragraph.paragraph_format.right_indent = Cm(0.35)
    paragraph.paragraph_format.space_before = Pt(4)
    paragraph.paragraph_format.space_after = Pt(10)
    paragraph.paragraph_format.line_spacing = 1.15
    shade(paragraph._p, "F2EFE6")
    for index, line in enumerate(lines):
        run = paragraph.add_run(line)
        set_run_font(run, MONO_FONT, 9, PETROL)
        if index < len(lines) - 1:
            run.add_break()
    paragraph_border(paragraph, color="A7CFC9", size=6, edge="left")
    return paragraph


def caption(text):
    paragraph = document.add_paragraph()
    paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    paragraph.paragraph_format.space_before = Pt(4)
    paragraph.paragraph_format.space_after = Pt(12)
    run = paragraph.add_run(text)
    set_run_font(run, size=8.5, color=MUTED, italic=True)


def add_picture(path, width_cm=16.4):
    converted = DOCS / "_readme_preview_tmp.png"
    with Image.open(path) as image:
        image.convert("RGB").save(converted, "PNG")
    document.add_picture(str(converted), width=Cm(width_cm))
    document.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
    converted.unlink(missing_ok=True)


def fact_table(rows):
    table = document.add_table(rows=1, cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    table.columns[0].width = Cm(5.1)
    table.columns[1].width = Cm(11.3)

    headers = ("Bereich", "Umsetzung")
    header_row = table.rows[0]
    tr_pr = header_row._tr.get_or_add_trPr()
    tbl_header = OxmlElement("w:tblHeader")
    tr_pr.append(tbl_header)
    for index, header in enumerate(headers):
        cell = table.rows[0].cells[index]
        cell.width = Cm(5.1 if index == 0 else 11.3)
        cell.text = ""
        set_cell_shading(cell, "082527")
        set_cell_margins(cell)
        run = cell.paragraphs[0].add_run(header)
        set_run_font(run, size=9, color=WHITE, bold=True)

    for row_index, (term, text) in enumerate(rows):
        cells = table.add_row().cells
        for cell in cells:
            set_cell_margins(cell)
        cells[0].width = Cm(5.1)
        cells[1].width = Cm(11.3)
        term_run = cells[0].paragraphs[0].add_run(term)
        set_run_font(term_run, size=9.5, bold=True)
        text_run = cells[1].paragraphs[0].add_run(text)
        set_run_font(text_run, size=9.5)
        if row_index % 2 == 0:
            set_cell_shading(cells[0], "F2EFE6")
            set_cell_shading(cells[1], "F2EFE6")
    document.add_paragraph().paragraph_format.space_after = Pt(2)
    return table


def note_box(title, text):
    table = document.add_table(rows=1, cols=1)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = table.rows[0].cells[0]
    set_cell_shading(cell, "FFF4D6")
    set_cell_margins(cell, top=180, start=200, bottom=180, end=200)
    paragraph = cell.paragraphs[0]
    paragraph.paragraph_format.space_after = Pt(3)
    run = paragraph.add_run(title)
    set_run_font(run, size=10, bold=True)
    paragraph.add_run(" ")
    body_run = paragraph.add_run(text)
    set_run_font(body_run, size=9.5)
    document.add_paragraph().paragraph_format.space_after = Pt(2)


document = Document()
document.core_properties.title = "Malerbetrieb Schmidt — Frontend-Portfolio-Fallstudie"
document.core_properties.author = "Gitm3h"
document.core_properties.language = "de-DE"
document.core_properties.subject = "Deutsche README-Fassung"

section = document.sections[0]
section.page_width = Cm(21)
section.page_height = Cm(29.7)
section.top_margin = Cm(2.1)
section.bottom_margin = Cm(1.8)
section.left_margin = Cm(2.2)
section.right_margin = Cm(2.2)
section.different_first_page_header_footer = True

styles = document.styles
normal = styles["Normal"]
normal.font.name = BODY_FONT
normal.font.size = Pt(10.5)
normal.font.color.rgb = INK
normal.paragraph_format.space_after = Pt(6)
normal.paragraph_format.line_spacing = 1.15
normal.element.get_or_add_rPr().append(
    OxmlElement("w:lang"),
)
normal.element.rPr.find(qn("w:lang")).set(qn("w:val"), "de-DE")
for style_name in ("List Bullet", "List Number"):
    style = styles[style_name]
    style.font.name = BODY_FONT
    style.font.size = Pt(10.5)
    style.font.color.rgb = INK

# Header and footer.
header = section.header.paragraphs[0]
header.alignment = WD_ALIGN_PARAGRAPH.RIGHT
header.paragraph_format.space_after = Pt(0)
header_run = header.add_run("MALERBETRIEB SCHMIDT  ·  PROJEKTDOKUMENTATION")
set_run_font(header_run, size=7.5, color=MUTED, bold=True)
paragraph_border(header, color="E6E0D2", size=4)

footer = section.footer.paragraphs[0]
footer.paragraph_format.space_before = Pt(4)
footer.paragraph_format.tab_stops.add_tab_stop(Cm(16.6), alignment=WD_TAB_ALIGNMENT.RIGHT)
left = footer.add_run("Fiktives Portfolio-Projekt · Stand November 2026")
set_run_font(left, size=7.5, color=MUTED)
footer.add_run("\t")
page_label = footer.add_run("Seite ")
set_run_font(page_label, size=7.5, color=MUTED)
add_page_field(footer, "PAGE")
of_label = footer.add_run(" von ")
set_run_font(of_label, size=7.5, color=MUTED)
add_page_field(footer, "NUMPAGES")

# Cover.
for _ in range(3):
    document.add_paragraph()

kicker = document.add_paragraph()
kicker.paragraph_format.space_after = Pt(12)
kicker_run = kicker.add_run("PORTFOLIO-FALLSTUDIE  ·  FRONTEND & UI DESIGN")
set_run_font(kicker_run, size=8.5, color=ULTRAMARINE, bold=True)

title = document.add_paragraph()
title.paragraph_format.space_after = Pt(4)
title_run = title.add_run("Malerbetrieb\nSchmidt")
set_run_font(title_run, HEAD_FONT, 36, INK, bold=True)

subtitle = document.add_paragraph()
subtitle.paragraph_format.space_after = Pt(18)
subtitle_run = subtitle.add_run("Ein fiktives Malerunternehmen als\nresponsives Frontend-Portfolio")
set_run_font(subtitle_run, HEAD_FONT, 16, PETROL, italic=True)
paragraph_border(subtitle, color="F3A712", size=18)

lead = body(
    "Deutsche Fassung der Projekt-README. Diese Fallstudie dokumentiert Konzept, "
    "Umsetzung, KI-Nutzung und Deployment des Portfolio-Projekts.",
    after=18,
    color=MUTED,
    size=10.5,
)

cover_table = document.add_table(rows=4, cols=2)
cover_table.autofit = False
cover_table.columns[0].width = Cm(3.6)
cover_table.columns[1].width = Cm(12.7)
links = [
    ("Live-Demo", "https://my-nuzl291ofg.brewpage.app/"),
    ("Englische Demo", "https://my-nuzl291ofg.brewpage.app/en/"),
    ("Repository", "https://github.com/Gitm3h/Malerbetrieb"),
    ("Design-Spezifikation", "https://github.com/Gitm3h/Malerbetrieb/blob/main/docs/DESIGN-SPEC.md"),
]
for index, (label, url) in enumerate(links):
    cells = cover_table.rows[index].cells
    cells[0].width = Cm(3.6)
    cells[1].width = Cm(12.7)
    label_run = cells[0].paragraphs[0].add_run(label)
    set_run_font(label_run, size=9, color=MUTED, bold=True)
    add_hyperlink(cells[1].paragraphs[0], url, url)

cover_note = body("Fiktives Unternehmen · keine echten Kunden · keine echten Bewertungen", after=14, before=18, color=MUTED, size=8.5, italic=True)
document.add_page_break()

# 1.
section_heading(1, "Worum es geht")
body(
    "Malerbetrieb Schmidt ist ein fiktives Hamburger Malerunternehmen. Die Website "
    "wurde als responsives Frontend- und UI-Design-Portfolioprojekt konzipiert und umgesetzt.",
)
body("Die Seite zeigt:")
bullet("eine eigenständige Art Direction für ein Handwerksunternehmen ohne übliche Stockfoto-Vorlage.")
bullet("responsive Layouts von 320 px bis zu breiten Desktops.")
bullet("vollständige deutsche und englische statische Seiten mit sichtbarem DE/EN-Umschalter.")
bullet("ein interaktives Pigment-Deck aus sieben Farben im Hero.")
bullet("Vorher-Nachher-Vergleiche mit Maus, Touch und Tastatur.")
bullet("eine horizontal scrollbare Bewertungsleiste mit automatischem Lauf und Pause bei Hover oder Fokus.")
bullet("einen „Whoosh“-Übergang bei Links und beim Scrollen.")
bullet("barrierefreie Formularzustände, Fokusmanagement und Unterstützung für reduzierte Bewegung.")
body(
    "Es gibt keine echten Kunden, keine echten Projekte, keine echten Bewertungen "
    "und kein Backend. Das Kontaktformular ist eine Demo und versendet oder speichert nichts.",
    before=4,
)

add_picture(DOCS / "portfolio-preview.webp")
caption("Desktop-Ansicht der deutschen Startseite. Screenshot: docs/portfolio-preview.webp")

# 2.
section_heading(2, "Projektkontext")
body(
    "Das Projekt soll Frontend-Handwerk zeigen: responsive Komposition, "
    "Interaktionsdesign, CSS-Animation, Barrierefreiheit und sorgfältige inhaltliche Rahmung. "
    "Die Unternehmensidentität ist erfunden, damit die visuelle Richtung ohne Namen oder "
    "Arbeiten eines echten Kunden erkundet werden konnte.",
)
body(
    "Die Transparenz-Sektion ist Teil der Live-Seite unter #projekt und nicht nur in dieser README versteckt.",
)
add_picture(DOCS / "project-preview.webp")
caption("Transparenz-Sektion auf der Live-Seite. Screenshot: docs/project-preview.webp")

# 3.
section_heading(3, "Technologie-Stack")
for item in (
    "React 19",
    "Vite 8",
    "Tailwind CSS 4",
    "Vite-Multipage-Build",
    "Zentrale deutsche und englische Textdateien",
    "Reines CSS für Welle, Deck, Bewertungen und Whoosh",
    "Semantisches HTML, Fokusmanagement, Unterstützung für reduzierte Bewegung",
    "Kein UI-Framework, keine Carousel-Bibliothek, keine Laufzeit-Abhängigkeit für Animationen",
):
    bullet(item)

# 4.
section_heading(4, "KI-Nutzung")
note_box(
    "KI-Hinweis.",
    "Dies ist ein KI-unterstütztes Portfolio-Projekt, keine Kundenarbeit. "
    "Anforderungen, Design- und Inhaltsentscheidungen, Prüfung und Freigabe lagen bei Gitm3h. "
    "Design-Exploration, Code und Texte wurden mit DeepSeek Harness erstellt. "
    "Raumbilder wurden mit Gemini generiert. Die Google-Rezensionen sind erfunden. "
    "Service- und Teamfotos stammen von Unsplash/Pexels.",
)
fact_table(
    [
        ("Design-Exploration, Code, Texte", "Mit DeepSeek Harness unter menschlicher Leitung erstellt"),
        ("Raum-Vorher/Nachher-Bilder", "Mit Gemini generiert; von Gitm3h ausgewählt und bereitgestellt"),
        ("Google-Rezensionen", "Für die Demo erfunden und formuliert"),
        ("Auszeichnungen/Badges", "Erfunden; es wurden keine echten Auszeichnungen verliehen"),
        ("Service- und Teamfotos", "Unsplash/Pexels, im Quellbaum nachgewiesen"),
        ("Anforderungen, Prüfung, Freigabe", "Gitm3h"),
    ]
)
body(
    "Die KI hat keinen echten Kunden, kein echtes Projekt und keine echten Referenzen erfunden. "
    "Die Website kennzeichnet das Unternehmen als fiktiv, die Bewertungen als fiktiv und die "
    "Raumbilder als KI-Illustrationen.",
    before=4,
)

# 5.
section_heading(5, "Funktionen")
for item in (
    "Responsiver Hero mit aufgefächertem Pigment-Deck aus sieben Farben.",
    "Deutsche Seite / und englische Seite /en/ mit gemeinsamem Komponentenbaum.",
    "DE/EN-Umschalter in Desktop-Navigation, mobilem Menü und Footer.",
    "Das Deck schließt sich, sortiert neu und öffnet sich wie ein Fächer; Hover zieht eine Karte heraus, Tippen auf Touch wählt sie aus.",
    "Barrierefreier Vorher-Nachher-Slider mit Tastatur, Zeiger und Touch.",
    "Service-Karten verlinken auf eine vorausgewählte Anfrage.",
    "Horizontal scrollbare Bewertungsleiste mit ausgeblendeter Scrollbar und automatischem Lauf.",
    "Fiktive Auszeichnungsleiste, die gegenläufig zu den Bewertungen läuft, mit nativem Scrollen und Hover-Pause.",
    "Whoosh-Effekt bei Links und beim Scrollen; bei reduzierter Bewegung deaktiviert.",
    "Gespiegelte animierte Footer-Welle passend zur Hero-Kaskade.",
    "Mobiles Navigationsmenü mit Fokusfalle.",
    "Impressum-/Datenschutz-Modal mit Fokusfalle.",
    "Clientseitige Validierung und simulierter Erfolgszustand.",
):
    bullet(item)

# 6.
section_heading(6, "Lokale Entwicklung")
body("Installation und Entwicklung:")
code_block(["npm install", "npm run dev"])
body("Build und Prüfung:", before=6)
code_block(["npm run lint", "npm run build", "npm run preview"])
body(
    "vite.config.js verwendet base: './'. Dadurch funktioniert der Build sowohl im Domain-Root "
    "als auch unter einem GitHub-Pages-Projektpfad.",
    before=2,
)

# 7.
section_heading(7, "Deployment")
body("Die Website wird derzeit auf zwei Wegen veröffentlicht:")
bullet("BrewPage: statischer ZIP-Upload, nicht gelistet.", bold_lead="")
bullet("GitHub Pages: gebauter Output im Branch gh-pages.", bold_lead="")
body("Jeder Push auf main startet .github/workflows/publish.yml:", before=6)
for index, step in enumerate(
    (
        "Installation mit npm ci.",
        "Build mit npm run build.",
        "Force-Push von dist/ in einen verwaisten Branch gh-pages.",
        "GitHub Pages auf gh-pages / Root verweisen, wenn das Workflow-Token die Berechtigung hat.",
    ),
    start=1,
):
    paragraph = document.add_paragraph(style="List Number")
    paragraph.paragraph_format.space_after = Pt(3)
    run = paragraph.add_run(step)
    set_run_font(run, size=10.5)
body(
    "Der Workflow kann keine lokalen Änderungen pushen, die nie committet wurden. "
    "Eine Änderung muss zuerst main erreichen.",
    before=6,
)
body(
    "Falls die Pages-Quelle nicht automatisch gesetzt wird, einmal unter "
    "Settings → Pages → Deploy from a branch → gh-pages / root aktivieren.",
)

# 8.
section_heading(8, "Bildnachweise")
bullet("Raumpaare: mit Gemini generiert, von Gitm3h bereitgestellt. Siehe src/assets/referenzen/CREDITS.md.")
bullet("Service-Bilder: Unsplash/Pexels. Siehe src/assets/services/CREDITS.md.")
bullet("Malerfoto: Pexels. Siehe src/assets/about/CREDITS.md.")
bullet("Schriften: Fraunces und Karla über Google Fonts.")

# 9.
section_heading(9, "Kontakt")
contact = document.add_paragraph()
contact.paragraph_format.space_after = Pt(8)
contact_run = contact.add_run("Portfolio und Code: Gitm3h auf GitHub – ")
set_run_font(contact_run, size=10.5)
add_hyperlink(contact, "https://github.com/Gitm3h", "github.com/Gitm3h")
body(
    "Dieses Projekt ist unabhängige Portfolio-Arbeit. Es steht in keiner Verbindung zu einem "
    "echten Malerunternehmen und wird nicht als solches präsentiert.",
    before=8,
    color=MUTED,
    size=9.5,
    italic=True,
)

document.save(OUT)
print(OUT)
