export function createEmailTemplate({
  subject,
  headerTitle,
  greeting,
  mainContent,
  buttonText,
  buttonUrl,
  quoteText = "Collaboration is the key to innovation and success."
}: {
  subject: string;
  headerTitle: string;
  greeting: string;
  mainContent: string;
  buttonText: string;
  buttonUrl: string;
  quoteText?: string;
}) {
  return {
    subject,
    html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      body {width: 620px;margin: 0 auto;}
      table {border-collapse: collapse;}
      table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
      img {-ms-interpolation-mode: bicubic;}
    </style>
    <![endif]-->
    <style type="text/css">
      body, p, div {
        font-family: arial,helvetica,sans-serif;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #3B82F6;
        text-decoration: none;
      }
      p { margin: 0; padding: 0; }
      table.wrapper {
        width:100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul  {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width:480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
  </head>
  <body>
    <center class="wrapper" data-link-color="#3B82F6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#f0f0f0;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#f0f0f0">
          <tr>
            <td valign="top" bgcolor="#f0f0f0" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
                          <center>
                          <table><tr><td width="620">
                          <![endif]-->
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:620px;" align="center">
                            <tr>
                              <td role="modules-container" style="padding:0px 10px 0px 10px; color:#000000; text-align:left;" bgcolor="#F0F0F0" width="100%" align="left">
                                
                                <!-- Brand Logo Section -->
                                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 0px 10px 0px;" bgcolor="#F0F0F0">
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table width="300" style="width:300px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px;margin:0px;border-spacing:0;">
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:10px 0px 10px 0px; line-height:36px; text-align:left;" height="100%" valign="top" bgcolor="#F0F0F0" role="module-content">
                                                        <div>
                                                          <div style="font-family: inherit; text-align: left">
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6; font-size: 32px; font-weight: bold;">Synco</span>
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- Purple Banner (Empty) -->
                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                  <tbody>
                                    <tr>
                                      <td style="padding:20px 15px 15px 15px; line-height:26px; text-align:inherit; background-color:#d488cc;" height="100%" valign="top" bgcolor="#d488cc" role="module-content">
                                        <div><div style="font-family: inherit; text-align: center"><span style="font-family: 'trebuchet ms', helvetica, sans-serif; color: #d488cc; font-size: 24px">&nbsp;</span></div></div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- Main Content -->
                                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:50px 20px 50px 20px;" bgcolor="#3172a3">
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table width="460" style="width:460px; border-spacing:0; border-collapse:collapse; margin:0px 50px 0px 50px;" cellpadding="0" cellspacing="0" align="center" border="0" bgcolor="" class="column column-0">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px;margin:0px;border-spacing:0;">
                                                
                                                <!-- Header -->
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:40px 0px 30px 0px; line-height:36px; text-align:inherit; background-color:#74bcd9;" height="100%" valign="top" bgcolor="#74bcd9" role="module-content">
                                                        <div>
                                                          <div style="font-family: inherit; text-align: center">
                                                            <span style="font-size: 46px; color: #ffffff; font-family: 'trebuchet ms', helvetica, sans-serif"><strong>${headerTitle}</strong></span>
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <!-- Message Content -->
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:50px 30px 30px 30px; line-height:28px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content">
                                                        <div>
                                                          <div style="font-family: inherit; text-align: inherit">
                                                            <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">${greeting}</span>
                                                          </div>
                                                          <div style="font-family: inherit; text-align: inherit"><br></div>
                                                          <div style="font-family: inherit; text-align: inherit">
                                                            <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">${mainContent}</span>
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <!-- Button -->
                                                <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center" bgcolor="#FFFFFF" class="outer-td" style="padding:0px 0px 40px 0px; background-color:#FFFFFF;">
                                                        <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                                                          <tbody>
                                                            <tr>
                                                              <td align="center" bgcolor="#3B82F6" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                                                <a href="${buttonUrl}" style="background-color:#3B82F6; border:0px solid #333333; border-color:#333333; border-radius:6px; border-width:0px; color:#ffffff; display:inline-block; font-size:16px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:15px 25px 15px 25px; text-align:center; text-decoration:none; border-style:solid; font-family:trebuchet ms,helvetica,sans-serif;" target="_blank">${buttonText}</a>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                                <!-- Signature -->
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:20px 30px 50px 30px; line-height:26px; text-align:inherit; background-color:#FFFFFF;" height="100%" valign="top" bgcolor="#FFFFFF" role="module-content">
                                                        <div>
                                                          <div style="font-family: inherit; text-align: center">
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; font-size: 16px; color: #656565">Thanks!</span>
                                                          </div>
                                                          <div style="font-family: inherit; text-align: center">
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; font-size: 16px; color: #656565">The Synco Team</span>
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>

                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- Quote Section -->
                                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 20px 0px 20px;" bgcolor="#D488CC">
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table width="440" style="width:440px; border-spacing:0; border-collapse:collapse; margin:0px 60px 0px 60px;" cellpadding="0" cellspacing="0" align="center" border="0" bgcolor="" class="column column-0">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px;margin:0px;border-spacing:0;">
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:30px 0px 10px 0px; line-height:32px; text-align:inherit; background-color:#D488CC;" height="100%" valign="top" bgcolor="#D488CC" role="module-content">
                                                        <div>
                                                          <div style="font-family: inherit; text-align: center">
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; color: #ffffff; font-size: 30px">"</span>
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; font-size: 26px; color: #ffffff">${quoteText}</span>
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; color: #ffffff; font-size: 30px">"</span>
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:0px 0px 25px 0px; line-height:32px; text-align:inherit; background-color:#D488CC;" height="100%" valign="top" bgcolor="#D488CC" role="module-content">
                                                        <div>
                                                          <div style="font-family: inherit; text-align: center">
                                                            <span style="font-family: 'trebuchet ms', helvetica, sans-serif; font-size: 16px; color: #ffffff">SYNCO TEAM</span>
                                                          </div>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <!-- Footer -->
                                <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:40px 0px 20px 0px;" bgcolor="#F0F0F0">
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table width="580" style="width:580px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="center" border="0" bgcolor="" class="column column-0">
                                          <tbody>
                                            <tr>
                                              <td style="padding:0px;margin:0px;border-spacing:0;">
                                                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="padding:16px 16px 5px 16px; font-size:12px; line-height:22px; color:#3B82F6; text-align:center;" height="100%" valign="top" bgcolor="#F0F0F0" role="module-content">
                                                        <div style="font-family: trebuchet ms,helvetica,sans-serif;">
                                                          <p>© 2024 Synco. All rights reserved.</p>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                          </td>
                          </tr>
                          </table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>
    `,
  };
}
