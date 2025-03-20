import React, { useState } from "react";
import { FiCamera, FiInfo } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InvoiceCreate = ({ onSaveInvoice }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [items, setItems] = useState([
    { id: 1, product: "", qty: 1, price: 0, total: 0 },
  ]);
  const [invoiceLabel, setInvoiceLabel] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceProduct, setInvoiceProduct] = useState("");
  const [from, setFrom] = useState({ name: "", email: "", phone: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", phone: "", address: "" });
  const [note, setNote] = useState("");

  const addItem = () => {
    const newItem = { id: items.length + 1, product: "", qty: 1, price: 0, total: 0 };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, [field]: value, total: field === "qty" || field === "price" ? item.qty * item.price : item.total }
        : item
    );
    setItems(updatedItems);
  };

  const calculateSubTotal = () => items.reduce((acc, item) => acc + item.total, 0);
  const subTotal = calculateSubTotal();
  const vat = (subTotal * 0.1).toFixed(2);
  const total = (subTotal + parseFloat(vat)).toFixed(2);

  const handleSaveInvoice = () => {
    const invoiceData = {
      invoiceLabel,
      invoiceNumber,
      invoiceProduct,
      from,
      to,
      items,
      subTotal,
      vat,
      total,
      note,
      startDate,
      endDate,
    };
    onSaveInvoice(invoiceData); // Pass invoice data to parent
  };

  return (
    <div className="col-xl-8">
      <div className="card invoice-container">
        <div className="card-header">
          <h5>Invoice Create</h5>
        </div>
        <div className="card-body p-0">
          <div className="px-4 pt-4">
            <div className="d-md-flex align-items-center justify-content-between">
              <div className="mb-4 mb-md-0 your-brand">
                <label htmlFor="img" className="wd-100 ht-100 mb-0 position-relative overflow-hidden border border-gray-2 rounded">
                  <img src="/images/logo-abbr.png" className="upload-pic img-fluid rounded h-100 w-100" alt="Uploaded" />
                  <div className="position-absolute start-50 top-50 end-0 bottom-0 translate-middle h-100 w-100 hstack align-items-center justify-content-center c-pointer upload-button">
                    <i aria-hidden="true" className="camera-icon"><FiCamera size={16} /></i>
                  </div>
                  <input className="file-upload" type="file" accept="image/*" id="img" hidden />
                </label>
                <div className="fs-12 text-muted">* Upload your brand</div>
              </div>
              <div className="d-md-flex align-items-center justify-content-end gap-4">
                <div className="form-group mb-3 mb-md-0">
                  <label className="form-label">Issue Date:</label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date:</label>
                  <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-dashed" />
          <div className="px-4 row justify-content-between">
            <div className="col-xl-3">
              <div className="form-group mb-3">
                <label htmlFor="InvoiceLabel" className="form-label">Invoice Label</label>
                <input type="text" className="form-control" id="InvoiceLabel" placeholder="Duralux Invoice" value={invoiceLabel} onChange={(e) => setInvoiceLabel(e.target.value)} />
              </div>
            </div>
            <div className="col-xl-3">
              <div className="form-group mb-3">
                <label htmlFor="InvoiceNumber" className="form-label">Invoice Number</label>
                <input type="text" className="form-control" id="InvoiceNumber" placeholder="#NXL2023" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="form-group mb-3">
                <label htmlFor="InvoiceProduct" className="form-label">Invoice Product</label>
                <input type="text" className="form-control" id="InvoiceProduct" placeholder="Product Name" value={invoiceProduct} onChange={(e) => setInvoiceProduct(e.target.value)} />
              </div>
            </div>
          </div>
          <hr className="border-dashed" />
          <div className="row px-4 justify-content-between">
            <div className="col-xl-5 mb-4 mb-sm-0">
              <div className="mb-4">
                <h6 className="fw-bold">Invoice From:</h6>
                <span className="fs-12 text-muted">Send an invoice and get paid</span>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="InvoiceName" className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="InvoiceName" placeholder="Business Name" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="InvoiceEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="InvoiceEmail" placeholder="Email Address" value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="InvoicePhone" className="col-sm-3 col-form-label">Phone</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="InvoicePhone" placeholder="Enter Phone" value={from.phone} onChange={(e) => setFrom({ ...from, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="InvoiceAddress" className="col-sm-3 col-form-label">Address</label>
                <div className="col-sm-9">
                  <textarea rows={5} className="form-control" id="InvoiceAddress" placeholder="Enter Address" value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="mb-4">
                <h6 className="fw-bold">Invoice To:</h6>
                <span className="fs-12 text-muted">Send an invoice and get paid</span>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="ClientName" className="col-sm-3 col-form-label">Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="ClientName" placeholder="Business Name" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="ClientEmail" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="ClientEmail" placeholder="Email Address" value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} />
                </div>
              </div>
              <div className="form-group row mb-3">
                <label htmlFor="ClientPhone" className="col-sm-3 col-form-label">Phone</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="ClientPhone" placeholder="Enter Phone" value={to.phone} onChange={(e) => setTo({ ...to, phone: e.target.value })} />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="ClientAddress" className="col-sm-3 col-form-label">Address</label>
                <div className="col-sm-9">
                  <textarea rows={5} className="form-control" id="ClientAddress" placeholder="Enter Address" value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-dashed" />
          <div className="px-4 clearfix proposal-table">
            <div className="mb-4 d-flex align-items-center justify-content-between">
              <div>
                <h6 className="fw-bold">Add Items:</h6>
                <span className="fs-12 text-muted">Add items to invoice</span>
              </div>
              <div className="avatar-text avatar-sm" data-bs-toggle="tooltip" data-bs-trigger="hover" title="Informations">
                <FiInfo />
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered overflow-hidden" id="tab_logic">
                <thead>
                  <tr className="single-item">
                    <th className="text-center">#</th>
                    <th className="text-center wd-450">Product</th>
                    <th className="text-center wd-150">Qty</th>
                    <th className="text-center wd-150">Price</th>
                    <th className="text-center wd-150">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <input type="text" name="product" placeholder="Product Name" className="form-control" value={item.product} onChange={(e) => handleInputChange(item.id, "product", e.target.value)} />
                      </td>
                      <td>
                        <input type="number" name="qty" placeholder="Qty" className="form-control qty" step="1" min="1" value={item.qty} onChange={(e) => handleInputChange(item.id, "qty", parseInt(e.target.value))} />
                      </td>
                      <td>
                        <input type="number" name="price" placeholder="Unit Price" className="form-control price" step="1.00" min="1" value={item.price} onChange={(e) => handleInputChange(item.id, "price", parseFloat(e.target.value))} />
                      </td>
                      <td>
                        <input type="number" name="total" placeholder="0.00" className="form-control total" readOnly value={item.total} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-sm bg-soft-danger text-danger" onClick={() => removeItem(items[items.length - 1].id)}>Delete</button>
              <button className="btn btn-sm btn-primary" onClick={addItem}>Add Items</button>
            </div>
          </div>
          <hr className="border-dashed" />
          <div className="px-4 pb-4">
            <div className="form-group">
              <label htmlFor="InvoiceNote" className="form-label">Invoice Note:</label>
              <textarea rows={6} className="form-control" id="InvoiceNote" placeholder="It was a pleasure working with you and your team..." value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleSaveInvoice}>Save Invoice</button>
      </div>
    </div>
  );
};

export default InvoiceCreate;