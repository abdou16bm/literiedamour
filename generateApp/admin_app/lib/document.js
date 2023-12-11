const path = require('path');
const fs = require('fs');


let html_mail_create = function (reserv_info,callback){

    let doc = "<!DOCTYPE html>\n" +
        "<html>\n" +
        "\n" +
        "<head>\n" +
        "\n" +
        "    <meta charset=\"utf-8\">\n" +
        "    <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n" +
        "    <title>Email Confirmation</title>\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
        "    <!-- Copyright © 2022 www.blackconcept-dev.com -->\n" +
        "    <style type=\"text/css\">\n" +
        "        /**\n" +
        "   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.\n" +
        "   */\n" +
        "        @media screen {\n" +
        "            @font-face {\n" +
        "                font-family: 'Source Sans Pro';\n" +
        "                font-style: normal;\n" +
        "                font-weight: 400;\n" +
        "                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');\n" +
        "            }\n" +
        "\n" +
        "            @font-face {\n" +
        "                font-family: 'Source Sans Pro';\n" +
        "                font-style: normal;\n" +
        "                font-weight: 700;\n" +
        "                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');\n" +
        "            }\n" +
        "        }\n" +
        "\n" +
        "        /**\n" +
        "   * Avoid browser level font resizing.\n" +
        "   * 1. Windows Mobile\n" +
        "   * 2. iOS / OSX\n" +
        "   */\n" +
        "        body,\n" +
        "        table,\n" +
        "        td,\n" +
        "        a {\n" +
        "            -ms-text-size-adjust: 100%;\n" +
        "            /* 1 */\n" +
        "            -webkit-text-size-adjust: 100%;\n" +
        "            /* 2 */\n" +
        "        }\n" +
        "\n" +
        "        /**\n" +
        "   * Remove extra space added to tables and cells in Outlook.\n" +
        "   */\n" +
        "        table,\n" +
        "        td {\n" +
        "            mso-table-rspace: 0pt;\n" +
        "            mso-table-lspace: 0pt;\n" +
        "        }\n" +
        "\n" +
        "        /**\n" +
        "   * Better fluid images in Internet Explorer.\n" +
        "   */\n" +
        "        img {\n" +
        "            -ms-interpolation-mode: bicubic;\n" +
        "        }\n" +
        "\n" +
        "        /**\n" +
        "   * Remove blue links for iOS devices.\n" +
        "   */\n" +
        "        a[x-apple-data-detectors] {\n" +
        "            font-family: inherit !important;\n" +
        "            font-size: inherit !important;\n" +
        "            font-weight: inherit !important;\n" +
        "            line-height: inherit !important;\n" +
        "            color: inherit !important;\n" +
        "            text-decoration: none !important;\n" +
        "        }\n" +
        "\n" +
        "        /**\n" +
        "   * Fix centering issues in Android 4.4.\n" +
        "   */\n" +
        "        div[style*=\"margin: 16px 0;\"] {\n" +
        "            margin: 0 !important;\n" +
        "        }\n" +
        "\n" +
        "        body {\n" +
        "            width: 100% !important;\n" +
        "            height: 100% !important;\n" +
        "            padding: 0 !important;\n" +
        "            margin: 0 !important;\n" +
        "        }\n" +
        "\n" +
        "        /**\n" +
        "   * Collapse table borders to avoid space between cells.\n" +
        "   */\n" +
        "        table {\n" +
        "            border-collapse: collapse !important;\n" +
        "        }\n" +
        "\n" +
        "\n" +
        "        a,\n" +
        "        a:active,\n" +
        "        a:focus,\n" +
        "        a:hover {\n" +
        "            color: #007bff;\n" +
        "            text-decoration: none;\n" +
        "            -webkit-transition-duration: 500ms;\n" +
        "            -o-transition-duration: 500ms;\n" +
        "            transition-duration: 500ms;\n" +
        "            outline: none;\n" +
        "            font-weight: 500;\n" +
        "        }\n" +
        "\n" +
        "        img {\n" +
        "            height: auto;\n" +
        "            line-height: 100%;\n" +
        "            text-decoration: none;\n" +
        "            border: 0;\n" +
        "            outline: none;\n" +
        "        }\n" +
        "    </style>\n" +
        "</head>\n" +
        "\n" +
        "<!-- Copyright © 2022 www.blackconcept-dev.com -->\n" +
        "\n" +
        "<body style=\"background-color: #e9ecef;\">\n" +
        "\n" +
        "\n" +
        "    <!-- start body -->\n" +
        "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
        "\n" +
        "        <!-- start logo -->\n" +
        "        <tr>\n" +
        "            <td align=\"center\" bgcolor=\"#e9ecef\">\n" +
        "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
        "                    <tr>\n" +
        "                        <td align=\"center\" valign=\"top\" style=\"padding: 36px 24px;\">\n" +
        "                            <a href=\"https://www.hotelbaydiab-dz.com\" target=\"_blank\" style=\"display: inline-block;\">\n" +
        "                                <img src=\"https://zupimages.net/up/22/29/b3r0.png\" width=\"100\" alt=\"Logo\" style=\"display: block; width: 100px\">\n" +
        "\n" +
        "                            </a>\n" +
        "                        </td>\n" +
        "                    </tr>\n" +
        "                </table>\n" +
        "            </td>\n" +
        "        </tr>\n" +
        "        <!-- end logo -->\n" +
        "\n" +
        "        <!-- start hero -->\n" +
        "        <tr>\n" +
        "            <td align=\"center\" bgcolor=\"#e9ecef\">\n" +
        "\n" +
        "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
        "                    <tr>\n" +
        "                        <td align=\"left\" bgcolor=\"#ffffff\"\n" +
        "                            style=\"padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;\">\n" +
        "                            <h1\n" +
        "                                style=\"margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;\">\n" +
        "                                Confirmation de réservation <span>"+reserv_info.reserv_ref+"</span></h1>\n" +
        "                        </td>\n" +
        "                    </tr>\n" +
        "                </table>\n" +
        "\n" +
        "            </td>\n" +
        "        </tr>\n" +
        "        <!-- end hero -->\n" +
        "\n" +
        "        <!-- start copy block -->\n" +
        "        <tr>\n" +
        "            <td align=\"center\" bgcolor=\"#e9ecef\">\n" +
        "\n" +
        "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
        "\n" +
        "                    <!-- start copy -->\n" +
        "                    <tr>\n" +
        "                        <td align=\"left\" bgcolor=\"#ffffff\"\n" +
        "                            style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\">\n" +
        "                            <p style=\"font-size: 20px;\">Bonjour,</p>\n" +
        "                            <p style=\"font-size: 20px;\">\n" +
        "                                Votre réservation à Hôtel Bay Diab est confirmée.\n" +
        "                            </p>\n" +
        "                            <p style=\"font-size: 20px;\"> L'établissement Bay Diab vous attend le <span\n" +
        "                                    style=\"color: #0e2737 ;\">"+reserv_info.reserv_date_b+"</span> </p>\n" +
        "\n" +
        "\n" +
        "                        </td>\n" +
        "                    </tr>\n" +
        "                    <!-- end copy -->\n" +
        "\n" +
        "                    <!-- start button -->\n" +
        "                    <tr>\n" +
        "                        <td align=\"left\" bgcolor=\"#ffffff\">\n" +
        "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n" +
        "                                <tr>\n" +
        "                                    <td align=\"center\" bgcolor=\"#ffffff\" style=\"padding: 12px;\">\n" +
        "                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n" +
        "                                            <tr>\n" +
        "                                                <td align=\"center\" bgcolor=\"#0e2737\" style=\"border-radius: 6px;\">\n" +
        "                                                    <a href=\""+reserv_info.reserv_link+"\" target=\"_blank\"\n" +
        "                                                        style=\"display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;\">\n" +
        "                                                        Télécharger la réservation</a>\n" +
        "                                                </td>\n" +
        "                                            </tr>\n" +
        "                                        </table>\n" +
        "                                    </td>\n" +
        "                                </tr>\n" +
        "                            </table>\n" +
        "                        </td>\n" +
        "                    </tr>\n" +
        "                    <!-- end button -->\n" +
        "\n" +
        "                    <!-- start copy -->\n" +
        "                    <tr>\n" +
        "                        <td align=\"left\" bgcolor=\"#ffffff\"\n" +
        "                            style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\">\n" +
        "                            <p style=\"color: #0e2737;\">Bay Diab Hôtel</p>\n" +
        "                            <p>Zone d'activité El Alia, Groupe 85, Section 2, Bab Ezzouar, Alger </p>\n" +
        "                            <p>Téléphone : +213 770 343 444</p>\n" +
        "                            <p>E-mail : <a href=\"mailto:reservation@hotelbaydiab-dz.com\"\n" +
        "                                    target=\"_blank\">reservation@hotelbaydiab-dz.com</a></p>\n" +
        "\n" +
        "\n" +
        "                            <p style=\"color:#cfb783 ; \"><a href=\"http://www.hotelbaydiab-dz.com/\"\n" +
        "                                    target=\"_blank\">www.hotelbaydiab-dz.com</a></p>\n" +
        "                        </td>\n" +
        "                    </tr>\n" +
        "                    <!-- end copy -->\n" +
        "\n" +
        "                </table>\n" +
        "\n" +
        "            </td>\n" +
        "        </tr>\n" +
        "        <!-- end copy block -->\n" +
        "\n" +
        "        <!-- start footer -->\n" +
        "        <tr>\n" +
        "            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 24px;\">\n" +
        "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n" +
        "\n" +
        "                    <!-- start permission -->\n" +
        "                    <tr>\n" +
        "                        <td align=\"center\" bgcolor=\"#e9ecef\"\n" +
        "                            style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n" +
        "                            <p style=\"margin: 0;\">Copyright © 2022 <a href=\"https://www.blackconcept-dev.com\"\n" +
        "                                    target=\"_blank\">Black Concept</a>.</p>\n" +
        "                        </td>\n" +
        "                    </tr>\n" +
        "                    <!-- end permission -->\n" +
        "\n" +
        "                </table>\n" +
        "            </td>\n" +
        "        </tr>\n" +
        "        <!-- end footer -->\n" +
        "\n" +
        "    </table>\n" +
        "    <!-- end body -->\n" +
        "\n" +
        "</body>\n" +
        "\n" +
        "</html>\n" +
        "\n" +
        "\n" +
        "<!-- Copyright © 2022 www.blackconcept-dev.com -->\n"



    if (callback){callback(doc)};

    return doc;

};




exports.html_mail_create = html_mail_create;
