// ==UserScript==
// @name        PGR21 새 불판 감지기
// @namespace   https://github.com/nyqui/pgr21-fresh-grill-detector
// @match       https://pgr21.com/pb/bulpan.php*
// @match       https://pgr21.co.kr/pb/bulpan.php*
// @match       https://pgr21.net/pb/bulpan.php*
// @match       https://pgrer.net/pb/bulpan.php*
// @match       https://ppt21.com/pb/bulpan.php*
// @version     0.1.0
// @author      nyqui
// @require     https://cdn.jsdelivr.net/npm/sweetalert2@11

// @description PGR21에서 불판에 상주시 새 불판으로 자동 이동
// @license     MIT
// ==/UserScript==

const footerString = "v" + GM_info.script.version;
//redirect timer in ms
const redirectTimer = 3000;
//admin comment class name
const admCmtName = ".admCmt";
const cmtWrapName = ".cmtWrap";
const toastMix = Swal.mixin({
  toast: true,
  icon: "success",
  position: "top-end",
  showConfirmButton: false,
  timer: `${redirectTimer}`,
  timerProgressBar: true,
  title: `새 불판 확인`,
  text: `잠시 후 이동합니다...`
});


/*
if ((window.location.hostname).includes("pgr21.com") === false) {
  window.location.hostname = "pgr21.com";
}
*/

const bulpanTitle = (document.title).replace(/(-|\(|#)(.*)/, "");

toastMix.fire({
  icon: "info",
  title: "새 불판 감지기 작동중",
  text: bulpanTitle,
  timer: 2000,
  footer: footerString
});

const observer = new MutationObserver(function(mutations, observer) {
  var admCmts = document.querySelectorAll(admCmtName);
  var lastadmCmt = admCmts[admCmts.length - 1];
  if ((lastadmCmt.innerText).includes(bulpanTitle)) {
    toastMix.fire({
      didDestroy: () => {
        window.location.href = (lastadmCmt.querySelector("a").getAttribute("href"));
      },
    });
  }
});

observer.observe(document.querySelector(cmtWrapName), {
  childList: true
});
