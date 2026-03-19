// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {

    // عناصر الصفحة
    const templateOptions = document.querySelectorAll('.template-option');
    const cardPreview = document.getElementById('cardPreview');
    const recipientInput = document.getElementById('recipientName');
    const displayName = document.getElementById('displayName');
    const downloadBtn = document.querySelector('.download-btn');
    const senderInput = document.getElementById('senderName');
const displaySender = document.getElementById('displaySender');

senderInput.addEventListener('input', () => {
    displaySender.textContent = senderInput.value.trim() || "محمد موسى";
    // 1. التعامل مع اختيار القوالب
    templateOptions.forEach(option => {
        option.addEventListener('click', () => {
            // إزالة حالة "نشط" من جميع الخيارات
            templateOptions.forEach(opt => opt.classList.remove('active'));
            // إضافة حالة "نشط" للخيار المختار
            option.classList.add('active');

            // الحصول على رقم القالب من data-template
            const selectedTemplateNumber = option.getAttribute('data-template');
            
            // إزالة جميع فئات القوالب السابقة وإضافة الفئة الجديدة
            cardPreview.classList.remove('template-1', 'template-2', 'template-3', 'template-4');
            cardPreview.classList.add(`template-${selectedTemplateNumber}`);
        });
    });

    // 2. تحديث الاسم في المعاينة فور الكتابة
    recipientInput.addEventListener('input', () => {
        const nameValue = recipientInput.value.trim();
        displayName.textContent = nameValue || "أحمد سالم"; // قيمة افتراضية إذا كان الحقل فارغاً
    });

    // 3. وظيفة تحميل البطاقة كصورة PNG
    downloadBtn.addEventListener('click', () => {
        const nameText = displayName.textContent.trim();
        const filename = nameText === "أحمد سالم" ? "eid_card.png" : `eid_card_${nameText}.png`;

        // استخدام html2canvas لالتقاط الـ DIV
        html2canvas(cardPreview, {
            scale: 3, // دقة عالية للتنزيل
            useCORS: true, // للسماح بتحميل الصور من روابط خارجية إذا وجدت
            backgroundColor: null, // خلفية شفافة لـ CANVAS (الخلفية داخل الـ div ستبقى)
        }).then(canvas => {
            // تحويل الـ canvas إلى رابط تنزيل
            const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            const link = document.createElement('a');
            link.download = filename;
            link.href = image;
            link.click();
        });
    });


});

});