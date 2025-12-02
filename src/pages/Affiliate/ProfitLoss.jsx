const ProfitLoss = () => {
  return (
    <section data-v-81c2ddd8 className="nw-affi-user-wrapper affi-pd-bot">
      <div data-v-81c2ddd8 className>
        <h3 data-v-81c2ddd8 className="nw-affi-heading-text">
          User Profit / Loss
        </h3>
        <form
          data-v-81c2ddd8
          className="typeslabel openbettss affiliate-pl affiliate-report affi-date-filter-form"
        >
          <ul
            style={{ paddingLeft: "0px" }}
            data-v-81c2ddd8
            className="typelabel-main flex-nowrap"
          >
            <li data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  From Date
                </label>
                <input
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                />
              </div>
            </li>
            <li data-v-81c2ddd8>
              <div data-v-81c2ddd8 className="form-group">
                <label data-v-81c2ddd8 className="label-pl12">
                  To Date
                </label>
                <input
                  data-v-81c2ddd8
                  type="date"
                  id="open-bet-from"
                  className="form-control"
                />
              </div>
            </li>
          </ul>
          <div data-v-81c2ddd8 className="download-main">
            <button
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>Submit</span>
            </button>
          </div>
        </form>
        <div data-v-81c2ddd8 className="nw-affi-user-list-wrapper">
          <div data-v-81c2ddd8 className="table-responsive nw-affi-user-table">
            <table data-v-81c2ddd8 className="table">
              <thead data-v-81c2ddd8>
                <tr data-v-81c2ddd8>
                  <th data-v-81c2ddd8>
                    <img
                      data-v-81c2ddd8
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAATlJREFUSIntlTEvg1EUhp8jjbIZBIMYEQwmiUXExmITob+gG4lORr+BpD/AbiYGi7EL0UjKYrLoIkKHx3JJ21TTxjf2Xe53c895nnuW70Jb1Lz6oB60n/0V9TD15NvPck1Fw8AcMA3MA1vqTY+OzdSzob4A1YhoNN9gV62bXd7UHYBQF4AK8AGcAwJFoApc9DjBdprgFAhgDxgFllFLybqfphlTG2q5RzhqWf1Sx9K+kJhHOWAy1T0BRERdXQGeexUAJeAsIuppX0vrVK5TdURU+oCTwB17mgUFda0fcJfMdBIUM4K3pFlwDDxmxJ0FTtoF1xFxmwVdXf35HsoC2C0DwUAwELQKIkPuL2uI9A4AWf1JAdbTWgt1ArgDxoF74POf8BFgEXgFlgBQl9Qr9T2DB/9dvVQXAb4B/G0i6WXchkIAAAAASUVORK5CYII="
                      alt="affi-user-icn"
                    />{" "}
                    Date
                  </th>
                  <th data-v-81c2ddd8>
                    <img
                      data-v-81c2ddd8
                      src="data:image/png;base64,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"
                      alt="affi-star"
                    />{" "}
                    Event
                  </th>
                  <th data-v-81c2ddd8>
                    <img
                      data-v-81c2ddd8
                      src="data:image/png;base64,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"
                      alt="affi-calendar"
                    />{" "}
                    Profit / Loss
                  </th>
                </tr>
              </thead>
              <tbody data-v-81c2ddd8>
                <tr data-v-81c2ddd8 className="tabetdat">
                  <td data-v-81c2ddd8 colSpan={5}>
                    <div
                      data-v-81c2ddd8
                      className="text-center affiliate-no-recoard-data"
                    >
                      No Records Found
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfitLoss;
