import React from "react";

const InvoiceView = ({ invoiceData }) => {
  if (!invoiceData) {
    return <div>No invoice data available.</div>;
  }

  const { invoiceLabel, invoiceNumber, invoiceProduct, from, to, items, subTotal, vat, total, note, startDate, endDate } = invoiceData;

  return (
    <div className="col-lg-12">
      <div className="card invoice-container">
        <div className="card-header">
          <h2 className="fs-16 fw-700 text-truncate-1-line mb-0 mb-sm-1">Invoice Preview</h2>
        </div>
        <div className="card-body p-0">
          <div className="px-4 pt-4">
            <div className="d-sm-flex align-items-center justify-content-between">
              <div>
                <div className="fs-24 fw-bolder font-montserrat-alt text-uppercase">{invoiceLabel}</div>
                <address className="text-muted">
                  {from.name}
                  <br />
                  {from.address}
                  <br />
                  VAT No: {from.phone}
                </address>
              </div>
              <div className="lh-lg pt-3 pt-sm-0">
                <h2 className="fs-4 fw-bold text-primary">Invoice</h2>
                <div>
                  <span className="fw-bold text-dark">Invoice: </span>
                  <span className="fw-bold text-primary">#{invoiceNumber}</span>
                </div>
                <div>
                  <span className="fw-bold text-dark">Due Date: </span>
                  <span className="text-muted">{endDate.toDateString()}</span>
                </div>
                <div>
                  <span className="fw-bold text-dark">Issued Date: </span>
                  <span className="text-muted">{startDate.toDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-dashed" />
          <div className="px-4 py-sm-5">
            <div className="d-sm-flex gap-4 justify-content-center">
              <div className="text-sm-end">
                <h2 className="fs-16 fw-bold text-dark mb-3">Invoiced To:</h2>
                <address className="text-muted lh-lg">
                  {to.name}
                  <br />
                  {to.address}
                  <br />
                  VAT No: {to.phone}
                </address>
              </div>
              <div className="border-end border-end-dashed border-gray-500 d-none d-sm-block"></div>
              <div className="mt-4 mt-sm-0">
                <h2 className="fs-16 fw-bold text-dark mb-3">Payment Details:</h2>
                <div className="text-muted lh-lg">
                  <div>
                    <span className="text-muted">Total Due:</span>
                    <span className="fw-bold text-dark"> ${total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-dashed mb-0" />
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Description</th>
                  <th>Rate</th>
                  <th>QTY</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.description}</td>
                    <td>${item.price}</td>
                    <td>{item.qty}</td>
                    <td className="text-dark fw-semibold">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="border-dashed mt-0" />
          <div className="px-4">
            <div className="alert alert-dismissible p-4 mt-3 alert-soft-warning-message" role="alert">
              <p className="mb-0">
                <strong>NOTES:</strong> {note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceView;