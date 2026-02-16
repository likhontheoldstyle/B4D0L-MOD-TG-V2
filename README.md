<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=35&pause=1000&color=00F2FF&center=true&vCenter=true&width=600&lines=𝄞⋆⃝🧚‍+𝐌𝐂𝐒-𝐁𝐎𝐓+🧚‍⋆⃝𝄞;VERSION+2.5.0-VIP;DEVELOPED+BY+MOHAMMAD+BADOL;POWERFUL+TELEGRAM+BOT" alt="Typing SVG" />
</p>

<p align="center">
<img src="https://capsule-render.vercel.app/render?type=soft&color=00F2FF&height=200&section=header&text=MOHAMMAD%20BADOL&fontSize=70&animation=fadeIn&fontAlignY=35" alt="Header" />
</p>

<p align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="100%">
</p>

<p align="center">
  <a href="https://t.me/mreditorzone">
    <img src="https://img.shields.io/badge/TELEGRAM-CHANNEL-blue?style=for-the-badge&logo=telegram" alt="Telegram">
  </a>
  <a href="https://wa.me/+8801782721761">
    <img src="https://img.shields.io/badge/WHATSAPP-CONTACT-green?style=for-the-badge&logo=whatsapp" alt="WhatsApp">
  </a>
  <a href="https://www.facebook.com/B4D9L">
    <img src="https://img.shields.io/badge/FACEBOOK-PROFILE-blue?style=for-the-badge&logo=facebook" alt="Facebook">
  </a>
</p>

---

# 𝄞⋆⃝🧚‍ 𝐌𝐂𝐒-𝐁𝐎𝐓 𝐕𝐈𝐏 🧚‍⋆⃝𝄞

> **The Most Powerful & Advanced Telegram User/Group Management Bot Built with Node.js.**

<div align="center">

![Version](https://img.shields.io/badge/Version-2.5.0--VIP-gold?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-v16%2B-green?style=for-the-badge&logo=node.js)
![Owner](https://img.shields.io/badge/Owner-Mohammad%20Badol-red?style=for-the-badge)

</div>

---

## 🌟 Key Features & Updates

* **🎭 Dual Command System:** সাপোর্ট করে **Prefix** (যেমন: `/start`) এবং **No-Prefix** (যেমন: `start`) কমান্ড।
* **🛡️ Hardcoded Security:** বটের কোর ফাইলে সিকিউরিটি লক করা। `AUTHOR_ID` বা `OWNER_ID` পরিবর্তন করলে বট অটোমেটিক বন্ধ হয়ে যাবে।
* **⚙️ Dynamic Loader:** বট রিস্টার্ট ছাড়াই `MCS-BOT/Cmd` এবং `Event` ফোল্ডার থেকে ফাইল লোড করতে পারে।
* **📊 Multi-Bot Instance:** একই স্ক্রিপ্টে একাধিক বট টোকেন দিয়ে চালানোর সক্ষমতা।
* **🔔 Boot Notification:** বট সফলভাবে চালু হলে ওনারের টেলিগ্রামে অটোমেটিক অ্যালার্ট পাঠায়।
* **🚫 Advanced Ban System:** ইউজারদের ব্লকলিস্ট করার জন্য শক্তিশালী সিকিউরিটি মডিউল।

---

## 📂 Project Structure

```text
MCS-BOT/
├── BADOL/               # Core Engine (Loader, Security, Notif, Utils)
├── MCS-BOT/             
│   ├── Cmd/             # সমস্ত কমান্ড ফাইল (.js) এখানে রাখুন
│   └── Event/           # জয়েন/লিভ ইভেন্ট ফাইলগুলো এখানে রাখুন
├── MCS-Config/          
│   └── config.js        # মেইন কনফিগারেশন (টোকেন এবং আইডি)
├── main.js              # বটের মেইন এন্ট্রি ফাইল
└── package.json         # প্রজেক্ট ডিপেন্ডেন্সি
