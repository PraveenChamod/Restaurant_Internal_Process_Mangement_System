import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from '../../../Images/logo.png'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFreport = (orders, reportType) => {
    const report = reportType;
    console.log(reportType);
    const today = new Date();
    const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const docDefinition = {
        pageMargins: [40, 60, 40, 40],
        header: {
            margin: [20, 10, 20, 10],
            columns: [
              {
                image: logo, 
                fit: [100, 100]
              },
              {
                text: 'Resto, No:01, Main Street, Matara',
                alignment: 'right',
                margin: [0, 25, 50, 0],
                fontSize: 14,
                lineHeight: 1.2
              }
            ]
          },
        content: [
          { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10, lineWidth: 1 }] },
          { text: report, style: 'header' },
          { text: '\n' },
          { text: 'Orders:', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', '*', '*'],
              body: [
                ['Customer', 'Qty', 'Price', 'Payment Method'],
                ...orders.map(order => [order.Customer, order.Quantity, order.TotalPrice, order.paymentMethod])
              ]
            }
          },
          { text: '\n' },
          { text: `Income: ${orders.reduce((total, order) => total + order.TotalPrice, 0)}`, style: 'total' },
        ],
        footer: {
            margin: [40, 0, 40, 20],
            columns: [
              {
                text: `Report generated at ${time} on ${date}`,
                fontSize: 10,
                alignment: 'left',
              },
              {
                text: 'Powered by Resto',
                fontSize: 10,
                alignment: 'right'
              }
            ]
          },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            alignment: 'center'
          },
          subheader: {
            fontSize: 14,
            bold: true
          },
          total: {
            fontSize: 14,
            bold: true,
            alignment: 'right'
          }
        }
    };
    pdfMake.createPdf(docDefinition).download(`${report}_${date}.pdf`);
}

export default PDFreport;