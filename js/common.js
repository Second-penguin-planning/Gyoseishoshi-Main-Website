document.addEventListener("DOMContentLoaded", function () {

    /* =============================
       ハンバーガーメニュー
    ============================= */

  const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger && nav) {

    const toggleMenu = (forceClose = false) => {
        const isOpen = forceClose ? false : hamburger.classList.toggle("active");
        nav.classList.toggle("show", isOpen);
        if (forceClose) hamburger.classList.remove("active");
    };

    hamburger.addEventListener("click", () => toggleMenu());

    nav.addEventListener("click", (e) => {
        const link = e.target.closest("a");
      if (link) {
    setTimeout(() => toggleMenu(true), 100);
        }
    });

}

    /* =============================
       CTAボタン → お問い合わせフォームの相談内容を自動選択
    ============================= */

    const serviceSelect = document.querySelector('.contact-form select[name="service"]');

    document.querySelectorAll("[data-topic]").forEach(btn => {
        btn.addEventListener("click", () => {
            if (serviceSelect) serviceSelect.value = btn.dataset.topic;
        });
    });

    /* =============================
       アコーディオン
    ============================= */

    const accordions = document.querySelectorAll(".accordion-header");

    accordions.forEach(button => {

        button.addEventListener("click", () => {

            const content = button.nextElementSibling;

            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }

        });

    });

});

/* =============================
   サービス切り替え
============================= */

function showService(type) {

    document.getElementById("company-services").style.display = "none";
    document.getElementById("country-services").style.display = "none";
    document.getElementById("worker-services").style.display = "none";

    document.getElementById(type + "-services").style.display = "block";

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });

}
/* =============================
   追加：プランBOX アニメーション
   （IntersectionObserver で
     画面に入ったときフェードイン）
============================= */
(function () {
    const targets = document.querySelectorAll(
        '.sp-plan-box, .ph-register-box'
    );

    if (!targets.length) return; // 要素がなければ何もしない

    // IntersectionObserver が使えない環境はそのまま表示
    if (!('IntersectionObserver' in window)) {
        targets.forEach(function (el) {
            el.style.opacity = '1';
        });
        return;
    }

    // 初期状態：非表示
    targets.forEach(function (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // 一度だけ発火
                }
            });
        },
        { threshold: 0.15 }
    );

    targets.forEach(function (el) {
        observer.observe(el);
    });
})();
