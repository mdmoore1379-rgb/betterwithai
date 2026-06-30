const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, 
        Header, Footer, AlignmentType, PageNumber, BorderStyle, WidthType, 
        ShadingType, HeadingLevel, LevelFormat } = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

// Simple MSA template
const msa = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 360, after: 200 } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 280, after: 160 } } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [new TextRun({ text: "BETTER WITH AI, LLC — MASTER SERVICES AGREEMENT", size: 18, color: "666666" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Page ", size: 18 }), new TextRun({ children: [PageNumber.CURRENT], size: 18 })]
        })]
      })
    },
    children: [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("MASTER SERVICES AGREEMENT")] }),
      new Paragraph({ children: [new TextRun("This Master Services Agreement (\"Agreement\") is entered into as of the date of the first Statement of Work (\"Effective Date\") by and between:")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Better With AI, LLC", bold: true }), new TextRun(" (\"Provider\"), and the client identified in the applicable Statement of Work (\"Client\").")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("1. Services")] }),
      new Paragraph({ children: [new TextRun("Provider will provide the AI consulting, planning, implementation, or advisory services described in one or more Statements of Work (\"SOWs\") or proposals attached or referenced hereto. Each SOW will specify scope, deliverables, timeline, and fees.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("2. Client Obligations")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Provide accurate and timely information and access required for the services.")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Designate a primary point of contact with authority to make decisions.")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Review deliverables and provide feedback within agreed timeframes.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("3. Fees and Payment")] }),
      new Paragraph({ children: [new TextRun("Fees are set forth in each SOW. Unless otherwise stated:")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Fixed-price work is due 50% on signing / start and 50% on delivery.")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Retainers are billed monthly in advance.")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Late payments accrue 1.5% per month.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("4. Intellectual Property")] }),
      new Paragraph({ children: [new TextRun("Upon full payment, Client owns all custom deliverables created specifically for Client under an SOW. Provider retains all rights to its pre-existing methodologies, frameworks, templates, prompts, code libraries, and general know-how. Client receives a perpetual, non-exclusive, non-transferable license to use such general IP as embodied in the deliverables.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("5. AI Tools & Disclaimers")] }),
      new Paragraph({ children: [new TextRun("Provider may use third-party large language models and AI tools. Client acknowledges that AI outputs can contain errors or hallucinations. Client is solely responsible for reviewing, testing, and validating all outputs and recommendations before use in production or decision-making. Provider makes no warranties regarding the accuracy or suitability of any AI-generated content.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("6. Confidentiality")] }),
      new Paragraph({ children: [new TextRun("Each party agrees to keep confidential the other party’s non-public information disclosed during the engagement and to use it only for performing under this Agreement.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("7. Limitation of Liability")] }),
      new Paragraph({ children: [new TextRun("EXCEPT FOR OBLIGATIONS OF CONFIDENTIALITY OR GROSS NEGLIGENCE, PROVIDER’S TOTAL LIABILITY UNDER ANY SOW SHALL NOT EXCEED THE FEES PAID BY CLIENT UNDER THAT SOW IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("8. Term and Termination")] }),
      new Paragraph({ children: [new TextRun("This Agreement continues until all SOWs are completed or terminated. Either party may terminate for convenience with 30 days written notice (or as specified in the SOW). Client shall pay for all work performed through termination.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("9. Independent Contractor")] }),
      new Paragraph({ children: [new TextRun("Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, or agency relationship.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("10. Governing Law")] }),
      new Paragraph({ children: [new TextRun("This Agreement is governed by the laws of the State of Texas. Any disputes shall be resolved exclusively in the courts of Tarrant County, Texas.")] }),

      new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: "Better With AI, LLC", bold: true })] }),
      new Paragraph({ children: [new TextRun("By: _______________________________     Date: _______________")] }),
      new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "Client", bold: true })] }),
      new Paragraph({ children: [new TextRun("By: _______________________________     Date: _______________")] }),
    ]
  }]
});

Packer.toBuffer(msa).then(buffer => {
  fs.writeFileSync("contracts/BetterWithAI_Master_Services_Agreement.docx", buffer);
  console.log("Created contracts/BetterWithAI_Master_Services_Agreement.docx");
});

// Simple SOW template
const sow = new Document({
  styles: { default: { document: { run: { font: "Arial", size: 22 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun("STATEMENT OF WORK")] }),
      new Paragraph({ children: [new TextRun("Project: [Project Name]")] }),
      new Paragraph({ children: [new TextRun("Client: [Client Name]")] }),
      new Paragraph({ children: [new TextRun("Date: [Date]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Scope of Work")] }),
      new Paragraph({ children: [new TextRun("[Describe the specific deliverables, AI tools/features, automations, funnels, agents, etc. Be as concrete as possible.]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Deliverables")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("...")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Timeline")] }),
      new Paragraph({ children: [new TextRun("Kickoff: [Date]   •   Draft delivery: [Date]   •   Final handoff: [Date]")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Investment")] }),
      new Paragraph({ children: [new TextRun("Total: $_______")] }),
      new Paragraph({ children: [new TextRun("Payment Schedule: 50% ($_____) due on signing. 50% ($_____) due on final delivery.")] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Assumptions & Client Responsibilities")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("Client will provide timely access to necessary accounts, data, and stakeholders.")] }),
      new Paragraph({ numbering: { reference: "bullets", level: 0 }, children: [new TextRun("...")] }),

      new Paragraph({ spacing: { before: 300 }, children: [new TextRun("This SOW is governed by the Master Services Agreement between the parties. By signing below, both parties agree to the terms above.")] }),

      new Paragraph({ spacing: { before: 400 }, children: [new TextRun("Provider: ___________________________ Date: ___________")] }),
      new Paragraph({ children: [new TextRun("Client: ___________________________ Date: ___________")] }),
    ]
  }]
});

Packer.toBuffer(sow).then(buffer => {
  fs.writeFileSync("contracts/BetterWithAI_Statement_of_Work_Template.docx", buffer);
  console.log("Created contracts/BetterWithAI_Statement_of_Work_Template.docx");
});

console.log("Contract generation complete.");