import React from "react";
import logo from "../../Components/GlobalImages/logo-set.png";

const Footer = () => {
  return (
    <>
      <footer class="main-ftr">
        <div class="ftr_top">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-9">
                <div class="d-flex flex-column justify-content-center align-items-center foort">
                  <img class="footer-logo text-center" src={logo} alt="" />
                  <p>
                    Please note that Setczone is an independent entity and is
                    not associated with, endorsed by, or officially affiliated
                    with the Internal Revenue Service (IRS) or any of its
                    subsidiaries or affiliates. For official IRS information,
                    please visit
                    <a href="www.irs.gov">www.irs.gov</a>. The term "IRS," along
                    with any related names, logos, symbols, and images, is the
                    property of their respective owners and is registered as
                    their trademark. Any mentions of the IRS on our website are
                    solely for the purpose of providing information and
                    commentary on relevant topics and are intended for
                    informational use only. We do not assert any representation
                    or special relationship with the IRS. If you have inquiries
                    or issues related to taxes or the IRS, we recommend
                    contacting the IRS directly.
                  </p>
                  <div class="fter">
                    <p>
                      © 2023 | <a href="privacy-policy.php">Privacy Policy</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
