import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from '../../../Images/logo.png'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const PDFreport = (orders, reportType) => {
    const report = reportType;
    console.log(reportType);
    console.log(orders);

    const today = new Date();
    const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const time = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    //------------------------------------
    let maxQuantity = 0;
    let cashOnDeliveryCount = 0;
    let onlinePaymentCount = 0;
    const foodQuantities = {};
    orders.map(order => {
      order.food.forEach(item => {
        if (item.FoodName in foodQuantities) {
          foodQuantities[item.FoodName].quantity += item.quantity;
          foodQuantities[item.FoodName].price += item.price * item.quantity;
        } else {
          foodQuantities[item.FoodName] = {
            quantity: item.quantity,
            food: item.FoodName,
            totalPrice: item.price * item.quantity,
            unitPrice: (item.price * item.quantity) / item.quantity
          };
        }
        if (item.PaymentMethod === "Cash On Delivery") {
          cashOnDeliveryCount++;
        } else {
            onlinePaymentCount++;
        }
      });
    });
   
    console.log(foodQuantities);

    const customerFoodQuantities = {};

    orders.forEach(order => {
        const customerName = order.customerName;
        if (!customerFoodQuantities[customerName]) {
            customerFoodQuantities[customerName] = 0;
        }
        customerFoodQuantities[customerName] += order.food.length;
    });

    let maxCustomer = null;
    let maxQty = -1;
    for (const customer in customerFoodQuantities) {
        if (customerFoodQuantities[customer] > maxQty) {
            maxCustomer = customer;
            maxQty = customerFoodQuantities[customer];
          }
    }

    console.log(maxCustomer);

    Object.values(foodQuantities).forEach(quantity => {
      if (quantity > maxQuantity) {
        maxQuantity = quantity;
      }
    });

    const numOrders = orders.length;

    //-------------------------------------

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

          { text: '\n' },
          { text: 'Food Quantities:', style: 'subheader' },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                ['Food Item', 'Quantity', 'Unit Price', 'Total Price'],
                ...Object.entries(foodQuantities).map(([foodName, quantity]) => {
                  const style = quantity.quantity === maxQty ? 'mostOrdered' : '';
                  return [
                    { text: foodName, style },
                    quantity.quantity,
                    quantity.unitPrice,
                    quantity.totalPrice
                  ];
                })
              ]
            }
          },
          { text: '\n' },
          { text: `Income: ${orders.reduce((total, order) => total + order.TotalPrice, 0)}`, style: 'header' },
          { text: '\n' },
          { text: `Best Customer: ${maxCustomer}`, style: 'header' },
          { text: '\n' },
          { text: `No of Orders: ${numOrders}`, style: 'header' },
          { text: '\n' },
          { text: `Cash On Delivery: ${cashOnDeliveryCount}     Card Payment: ${onlinePaymentCount}`, style: 'header' },
          { text: '\n' },
          // { text: 'Orders:', style: 'subheader' },
          // {
          //   table: {
          //     headerRows: 1,
          //     widths: ['*', '*', '*', 'auto', 'auto', '*'],
          //     body: [
          //       ['Customer', 'Date','Food Name', 'Qty', 'Price', 'Payment Method'],
          //       ...orders.map(order => (
          //         order.food.map(item => [order.customerName, order.Date.slice(0, 10), item.FoodName, item.quantity, item.price * item.quantity, item.PaymentMethod])
          //       )).flat()
          //     ]
          //   }
          // },
          { text: '\n' },
          
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
            alignment: 'center'
          },
          mostOrdered: {
            color: 'red',
            bold: true
          }
        }
    };
    pdfMake.createPdf(docDefinition).download(`${report}_${date}.pdf`);
}

export default PDFreport;