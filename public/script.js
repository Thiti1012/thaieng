const inputText = document.getElementById('inputText');
const translateBtn = document.getElementById('translateBtn');
const resultBox = document.getElementById('resultBox');

translateBtn.addEventListener('click', async () => {
    const textToTranslate = inputText.value.trim();

    if (!textToTranslate) {
        alert("กรุณากรอกข้อความภาษาไทยก่อนครับ");
        return;
    }

    if (textToTranslate.length > 1000) {
        alert("ข้อความยาวเกิน 1,000 ตัวอักษร");
        return;
    }

    resultBox.innerText = "กำลังแปลภาษา...";
    translateBtn.disabled = true;

    try {
        const response = await fetch("/api/translate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: textToTranslate })
        });

        const data = await response.json();

        if (data.translated_text) {
            resultBox.innerText = data.translated_text;
        } else {
            resultBox.innerText = "ไม่สามารถแปลภาษาได้ กรุณาลองใหม่อีกครั้ง";
        }
    } catch (error) {
        console.error("เกิดข้อผิดพลาดในการแปล:", error);
        resultBox.innerText = "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์";
    } finally {
        translateBtn.disabled = false;
    }
});