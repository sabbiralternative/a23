import { useState } from "react";

const Reports = () => {
  const [tab, setTab] = useState("commission");
  return (
    <div data-v-ca1229b4 className="affi-pd-bot">
      <div data-v-ca1229b4 className="sub-header-tab refer-earn-sec aff-report">
        <div data-v-ca1229b4 className="">
          <ul
            data-v-ca1229b4
            className="nav nav-pills matka-detali-top"
            id="pills-tab"
            role="tablist"
          >
            <li
              onClick={() => setTab("commission")}
              data-v-ca1229b4
              className="nav-item"
              role="presentation"
            >
              <button
                data-v-ca1229b4
                className={`nav-link  ${tab === "commission" ? "active" : ""}`}
                id="pills-worli-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-worli"
                type="button"
                role="tab"
                aria-controls="pills-worli"
                aria-selected="true"
              >
                Commission Report
              </button>
            </li>
            <li
              onClick={() => setTab("report")}
              data-v-ca1229b4
              className="nav-item"
              role="presentation"
            >
              <button
                data-v-ca1229b4
                className={`nav-link  ${tab === "report" ? "active" : ""}`}
                id="pills-bets-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-bets"
                type="button"
                role="tab"
                aria-controls="pills-bets"
                aria-selected="false"
              >
                User Report
              </button>
            </li>
          </ul>
        </div>
      </div>
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
            type="button"
            className="nw-affi-add-new-user-btn"
            data-bs-target="#AfAddNewUser"
            data-bs-toggle="modal"
            data-v-4c49d924
          >
            <span data-v-4c49d924>Submit</span>
          </button>
        </div>
      </form>
      <section data-v-ca1229b4 className="af-top-user-wrapper">
        <div data-v-ca1229b4 className="">
          <div data-v-ca1229b4 className>
            <div
              data-v-ca1229b4
              className="table-responsive nw-affi-user-table"
            >
              <table data-v-ca1229b4 className="table">
                <thead data-v-ca1229b4>
                  <tr data-v-ca1229b4>
                    <th data-v-ca1229b4>
                      <img
                        data-v-ca1229b4
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAATlJREFUSIntlTEvg1EUhp8jjbIZBIMYEQwmiUXExmITob+gG4lORr+BpD/AbiYGi7EL0UjKYrLoIkKHx3JJ21TTxjf2Xe53c895nnuW70Jb1Lz6oB60n/0V9TD15NvPck1Fw8AcMA3MA1vqTY+OzdSzob4A1YhoNN9gV62bXd7UHYBQF4AK8AGcAwJFoApc9DjBdprgFAhgDxgFllFLybqfphlTG2q5RzhqWf1Sx9K+kJhHOWAy1T0BRERdXQGeexUAJeAsIuppX0vrVK5TdURU+oCTwB17mgUFda0fcJfMdBIUM4K3pFlwDDxmxJ0FTtoF1xFxmwVdXf35HsoC2C0DwUAwELQKIkPuL2uI9A4AWf1JAdbTWgt1ArgDxoF74POf8BFgEXgFlgBQl9Qr9T2DB/9dvVQXAb4B/G0i6WXchkIAAAAASUVORK5CYII="
                        alt="affi-user-icn"
                      />
                      Date
                    </th>
                    <th data-v-ca1229b4>
                      <img
                        data-v-ca1229b4
                        src="data:image/png;base64,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"
                        alt=""
                      />
                      Commission
                    </th>
                    {/**/}
                    {/**/}
                  </tr>
                </thead>
                <tbody data-v-ca1229b4>
                  <tr data-v-ca1229b4 className="tabetdat">
                    <td data-v-ca1229b4 colSpan={5}>
                      <div
                        data-v-ca1229b4
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
    </div>
  );
};

export default Reports;
