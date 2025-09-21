declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | [number, number];
    filename?: string;
    image?: { type?: string; quality?: number };
    html2canvas?: any;
    jsPDF?: { unit?: string; format?: string; orientation?: string };
  }

  interface Html2Pdf {
    from(element: HTMLElement | string): this;
    set(options: Html2PdfOptions): this;
    save(): Promise<void>;
  }

  function html2pdf(): Html2Pdf;

  export = html2pdf;
}
