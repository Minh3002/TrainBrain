# PROMPT THIẾT KẾ LẠI UX/UI -- "TÍNH NHANH LUYỆN NÃO"

## 1. Mục tiêu tổng thể

Hãy **thiết kế lại toàn bộ giao diện hiện tại** của ứng dụng "Tính Nhanh
Luyện Não" dựa trên screenshot đính kèm.

### Vấn đề của UI hiện tại

Giao diện hiện tại có phong cách: - Dark mode. - Nền xanh đen, khá
tối. - Nhiều hiệu ứng glow/neon. - Cảm giác hơi giống dashboard hoặc ứng
dụng dành cho người lớn. - Ít yếu tố vui nhộn và tương tác trực quan. -
Chưa tạo được cảm giác "game học tập" dành cho trẻ em. - CTA "Bắt Đầu
Luyện Toán" chưa đủ hấp dẫn về mặt thị giác.

### Định hướng mới

Tôi muốn chuyển sang phong cách:

> **Vui nhộn -- tươi sáng -- nhiều năng lượng -- thân thiện với trẻ em
> -- giống một trò chơi giáo dục hiện đại, nhưng vẫn sạch sẽ và chuyên
> nghiệp.**

Không thiết kế theo kiểu app giáo dục khô khan. Hãy tạo cảm giác trẻ em
**muốn bấm vào để chơi**, thay vì cảm giác đang mở một công cụ học tập.

------------------------------------------------------------------------

# 2. Phong cách hình ảnh chủ đạo

## Visual direction

Ưu tiên: - Bright & colorful. - Playful. - Friendly. - Rounded. - Soft
3D / cartoon illustration. - Gamification. - Large visual elements. -
Micro-interactions. - Positive energy.

Có thể tham khảo tinh thần của các ứng dụng/game giáo dục trẻ em hiện
đại như: - Duolingo Kids. - Khan Academy Kids. - ABCmouse. - Các mobile
game giáo dục cho trẻ.

**Không sao chép giao diện hoặc nhận diện thương hiệu của các sản phẩm
trên. Chỉ tham khảo tinh thần thiết kế.**

------------------------------------------------------------------------

# 3. Thay đổi Dark UI thành Light UI

## Không sử dụng

-   Nền xanh đen toàn màn hình.
-   Neon glow quá mạnh.
-   Viền xám mảnh trên nền tối.
-   Dashboard style.
-   Cảm giác "developer/admin tool".
-   Quá nhiều gradient xanh đậm.

## Sử dụng

Nền sáng, ví dụ: - #FFF9EE - #F5FAFF - #FFF4F7 - hoặc nền pastel rất
nhẹ.

Có thể sử dụng các mảng màu pastel: - Xanh dương. - Xanh cyan. - Vàng. -
Cam. - Hồng. - Tím. - Xanh lá.

Màu sắc cần **tươi sáng nhưng không chói**, đảm bảo text vẫn dễ đọc.

------------------------------------------------------------------------

# 4. Tạo một "Mascot" làm nhân vật trung tâm

Thay icon đầu người hiện tại bằng một mascot dễ thương.

Ví dụ concept:

### "Bạn Não Nhỏ"

Một nhân vật: - Não bộ hoạt hình. - Khuôn mặt vui vẻ. - Mắt lớn. - Có
tay/chân nhỏ. - Biểu cảm linh hoạt. - Có thể đội kính, đội mũ hoặc đeo
balo nhỏ. - Có thể thay đổi biểu cảm theo kết quả luyện tập.

Mascot phải trở thành **nhân vật nhận diện chính của ứng dụng**.

Ví dụ trạng thái: - Chào mừng → cười. - Bắt đầu luyện → hào hứng. - Trả
lời đúng → ăn mừng. - Chuỗi đúng dài → phấn khích. - Trả lời sai → động
viên, không tạo cảm giác thất bại. - Hoàn thành phiên → vui mừng.

Có thể sử dụng illustration 2D hoặc soft 3D.

------------------------------------------------------------------------

# 5. Header

Thiết kế header đơn giản hơn.

Thay:

> "Tính Nhanh Luyện Não"

bằng một logo/brand nhỏ + mascot.

Ví dụ:

🧠 **Tính Nhanh!**

Phía bên phải: - 🔊 Âm thanh. - 📊 Thống kê. - ⚙️ Cài đặt.

Các icon nên nằm trong các nút tròn hoặc pill button màu pastel.

Không dùng icon kiểu dashboard doanh nghiệp.

------------------------------------------------------------------------

# 6. Hero section

Phần đầu trang phải là khu vực gây ấn tượng mạnh nhất.

Ví dụ:

### 🧠 Xin chào!

**Sẵn sàng thử thách bộ não chưa?**

> Luyện tính nhẩm mỗi ngày và xem mình tiến bộ nhé!

Bên cạnh hoặc phía dưới là mascot lớn.

Mascot có thể đứng trên: - đám mây, - ngôi sao, - các con số, - hình
học, - tia sáng, - confetti.

Mục tiêu là khi mở app, trẻ nhìn vào và ngay lập tức hiểu:

> "Đây là một trò chơi toán học vui."

------------------------------------------------------------------------

# 7. Hai chế độ chính

Hiện tại có:

-   Tính Nhanh Luyện Não
-   Nhớ Từ Cuối Tuần

Hãy biến chúng thành **2 game card lớn**, thay vì một segmented control
nhỏ.

## Card 1 -- Tính Nhanh Luyện Não

Icon/illustration: 🧮 hoặc mascot đang giải toán.

Title:

**Tính Nhanh**

Subtitle:

> Thử thách phản xạ tính nhẩm!

Có thể thêm: - ⭐ XP. - 🔥 Streak. - 🏆 Best score.

Card màu xanh/cyan hoặc xanh dương pastel.

## Card 2 -- Nhớ Từ Cuối Tuần

Icon: 🧠 / 📝 / 🌈

Title:

**Nhớ Từ**

Subtitle:

> Cùng ôn lại những từ đã học!

Card màu hồng/tím pastel.

### Quan trọng

Hai card phải: - To. - Dễ bấm. - Có illustration. - Có chiều sâu. - Có
hover/press animation. - Trông giống game mode selection.

------------------------------------------------------------------------

# 8. CTA "Bắt Đầu Luyện Toán"

Đây phải là **nút nổi bật nhất trên toàn màn hình**.

Không sử dụng button xanh đậm kiểu corporate hiện tại.

Thiết kế:

### ▶️ BẮT ĐẦU CHƠI

hoặc:

### 🚀 BẮT ĐẦU LUYỆN

Button: - Rộng. - Bo góc lớn. - Màu gradient sáng. - Có shadow mềm. - Có
mascot/icon nhỏ. - Có animation nhẹ khi hover. - Khi click có press
animation.

Có thể thêm text nhỏ:

> "Chỉ mất 2 phút!"

để giảm cảm giác "phải học".

------------------------------------------------------------------------

# 9. Gamification

Đây là phần rất quan trọng.

Giao diện trẻ em nên có cảm giác người dùng đang **chơi game và lên
cấp**.

Thêm một khu vực:

## 🌟 Tiến trình hôm nay

Ví dụ:

**🔥 Chuỗi hiện tại**

7 câu đúng liên tiếp

**⭐ XP hôm nay**

120 / 200 XP

**🏆 Kỷ lục**

18 câu đúng

Có progress bar.

Ví dụ:

`████████░░ 70%`

Nhưng progress bar phải có thiết kế vui nhộn: - ngôi sao, - tia sáng, -
mascot, - phần thưởng.

------------------------------------------------------------------------

# 10. Thống kê

Không nên đưa "Biểu Đồ Thống Kê" lên màn hình chính như một button lớn
kiểu dashboard.

Thay vào đó:

## 📈 Hôm nay bạn đã làm được

3 phiên luyện tập

🎯 Chính xác: **92%**

⚡ Tốc độ: **2.9 giây/câu**

🔥 Streak: **5 ngày**

Thiết kế bằng các mini-card.

Nếu muốn xem chi tiết:

> **Xem tiến trình →**

------------------------------------------------------------------------

# 11. Tạo cảm giác phần thưởng

Có thể thêm:

### 🎁 Phần thưởng hôm nay

"Hoàn thành thêm 5 câu để mở khóa ⭐"

Hoặc:

### 🏆 Mục tiêu hôm nay

"Còn 3 câu nữa!"

Điều này tạo motivation mà không cần làm giao diện phức tạp.

------------------------------------------------------------------------

# 12. Navigation phía dưới

Thanh navigation hiện tại khá giống ứng dụng business.

Thiết kế lại thành:

### 🏠 Chơi

### 🏆 Thành tích

### 🎁 Phần thưởng

### ⚙️ Cài đặt

Có thể chỉ dùng 3 tab nếu cần tối giản:

🏠 **Chơi**

🏆 **Thành tích**

⚙️ **Cài đặt**

Tab đang chọn: - Có màu nổi bật. - Icon lớn hơn. - Có pill/background. -
Có animation nhẹ.

Không sử dụng đường line xanh nhỏ như screenshot hiện tại.

------------------------------------------------------------------------

# 13. Typography

Font phải thân thiện với trẻ em nhưng vẫn dễ đọc.

Có thể dùng: - Nunito. - Quicksand. - Baloo 2 cho heading. - Fredoka. -
Poppins nếu cần trung tính hơn.

### Heading

Bold, rounded, vui vẻ.

### Body

Readable, không quá nhỏ.

Tránh: - Font quá corporate. - Font condensed. - Font quá mảnh.

------------------------------------------------------------------------

# 14. Border radius

Tăng độ bo góc.

Khuyến nghị: - Card: 20--28px. - Button: 18--24px. - Avatar/icon
container: 50%. - Modal: 24--32px.

Giao diện nên có cảm giác mềm mại.

------------------------------------------------------------------------

# 15. Shadow

Không dùng glow neon mạnh.

Dùng: - Soft shadow. - Colored shadow nhẹ. - Elevation nhẹ.

Ví dụ:

Card nổi nhẹ khỏi background.

Button có shadow màu tương ứng rất nhẹ.

------------------------------------------------------------------------

# 16. Illustration

Ưu tiên illustration thay cho icon đơn thuần.

Ví dụ:

Thay icon calculator nhỏ bằng:

> Một chiếc máy tính hoạt hình có khuôn mặt đang nhảy lên.

Thay icon brain bằng:

> Một bộ não hoạt hình đội mũ tốt nghiệp.

Thay biểu đồ bằng:

> Mascot đang leo lên một chiếc thang có các ngôi sao.

Điều này sẽ làm giao diện giống **learning game** hơn.

------------------------------------------------------------------------

# 17. Micro-interaction

Thiết kế interaction ngay từ đầu.

Ví dụ:

### Khi hover button

Button: - scale 1.02--1.04. - shadow tăng nhẹ.

### Khi click

Button: - scale xuống nhẹ. - sau đó trở lại.

### Khi trả lời đúng

-   ⭐ Star animation.
-   Confetti nhỏ.
-   Mascot vui.
-   Sound effect nhẹ nếu bật âm thanh.

### Khi trả lời sai

Không hiển thị kiểu:

❌ SAI!

quá mạnh.

Thay bằng:

> 💪 Gần đúng rồi! Thử lại nhé!

Mascot đổi sang biểu cảm động viên.

### Khi hoàn thành

-   Confetti.
-   Mascot ăn mừng.
-   Hiển thị XP nhận được.
-   Hiển thị streak.

------------------------------------------------------------------------

# 18. Màn hình luyện toán

Khi người dùng bấm "Bắt đầu", chuyển sang một giao diện hoàn toàn giống
game.

Ví dụ:

``` text
        🔥 7        ⭐ 120 XP

              8 + 7 = ?

        ┌─────┐ ┌─────┐ ┌─────┐
        │  12 │ │  15 │ │  16 │
        └─────┘ └─────┘ └─────┘

             ███████░░░

        🧠 Cố lên! Bạn đang rất nhanh!
```

Số toán phải là thành phần lớn nhất.

Có thể thêm mascot nhỏ bên cạnh.

------------------------------------------------------------------------

# 19. Không gian và bố cục

Không làm giao diện quá dày.

Ưu tiên:

**Mascot → Game mode → CTA → Progress → Stats**

Mỗi khu vực có khoảng trắng rõ ràng.

Trên mobile: - CTA dễ bấm bằng ngón tay. - Card không quá nhỏ. - Text
không bị dồn. - Bottom navigation cố định.

------------------------------------------------------------------------

# 20. Responsive

Thiết kế ưu tiên mobile-first.

Phải hoạt động tốt trên:

-   Mobile 360px.
-   Mobile 390px.
-   Mobile 430px.
-   Tablet.
-   Desktop.

Không chỉ thu nhỏ giao diện desktop xuống mobile.

Hãy thiết kế layout riêng phù hợp mobile.

------------------------------------------------------------------------

# 21. Accessibility

Dù thiết kế cho trẻ em, vẫn phải đảm bảo:

-   Contrast đủ tốt.
-   Font dễ đọc.
-   Không phụ thuộc hoàn toàn vào màu sắc để truyền tải trạng thái.
-   Button đủ lớn để chạm.
-   Không sử dụng animation gây khó chịu.
-   Có thể tắt âm thanh.
-   Có thể giảm motion nếu thiết bị yêu cầu.

------------------------------------------------------------------------

# 22. Design system đề xuất

Tạo một design system thống nhất.

### Primary

Bright Blue / Cyan

### Secondary

Yellow / Orange

### Accent

Pink / Purple

### Success

Green

### Background

Off-white / Very light pastel

### Text

Dark navy / Dark purple

### Border

Light pastel gray

Không biến mọi thành phần thành một màu khác nhau. Màu sắc phải có hệ
thống.

------------------------------------------------------------------------

# 23. Điều cần tránh

TUYỆT ĐỐI tránh:

-   Dark dashboard.
-   Corporate UI.
-   Neon gaming quá mạnh.
-   Quá nhiều glow.
-   Quá nhiều gradient.
-   Card nhỏ và nhiều chữ.
-   Icon nhỏ.
-   Giao diện giống phần mềm quản trị.
-   Biểu đồ chiếm quá nhiều diện tích.
-   Quá nhiều thông tin ngay màn hình đầu tiên.
-   Cảm giác "đang học bài".
-   Cảm giác "đang làm bài kiểm tra".

Mục tiêu là:

> **PLAY FIRST -- LEARNING SECOND**

Người dùng phải cảm thấy mình đang chơi một game, nhưng thực chất đang
luyện khả năng tính nhẩm.

------------------------------------------------------------------------

# 24. Mục tiêu cảm xúc

Sau khi nhìn vào màn hình đầu tiên, trẻ nên có 5 cảm giác:

1.  😍 "Giao diện này dễ thương."
2.  👀 "Có nhiều thứ thú vị."
3.  🎮 "Mình muốn bấm thử."
4.  ⭐ "Mình muốn đạt điểm cao hơn."
5.  🔥 "Mình muốn chơi thêm một lượt."

------------------------------------------------------------------------

# 25. Yêu cầu đầu ra từ đội thiết kế

Hãy redesign dựa trên screenshot hiện tại nhưng **không chỉ đổi màu**.

Cần redesign lại:

1.  Home screen.
2.  Game mode selection.
3.  Main CTA.
4.  Gamification/progress.
5.  Statistics preview.
6.  Bottom navigation.
7.  Mascot.
8.  Game screen.
9.  Correct-answer state.
10. Wrong-answer state.
11. Completion/result screen.
12. Responsive mobile layout.

Tạo một visual system thống nhất giữa tất cả màn hình.

------------------------------------------------------------------------

# 26. Concept tổng thể cần đạt

Hãy hình dung sản phẩm là:

> **Một trò chơi luyện não dành cho trẻ em, được thiết kế đẹp và hiện
> đại như một mobile game giáo dục cao cấp.**

Không phải:

> Một dashboard thống kê dành cho người lớn.

### Từ khóa thiết kế

**Playful + Bright + Cute + Gamified + Educational + Modern + Friendly +
Energetic**

------------------------------------------------------------------------

# 27. Yêu cầu quan trọng nhất

Đừng chỉ lấy UI hiện tại rồi:

-   đổi nền đen thành nền trắng,
-   đổi xanh đậm thành xanh sáng,
-   đổi icon.

Đó **không phải redesign**.

Hãy thay đổi **visual hierarchy, layout, illustration, mascot,
gamification, card design, CTA và interaction** để sản phẩm có một ngôn
ngữ thiết kế mới hoàn toàn.

Screenshot hiện tại chỉ dùng để hiểu: - cấu trúc chức năng, - nội
dung, - các tính năng hiện có.

**Không dùng screenshot làm giới hạn về phong cách thiết kế.**

Hãy đề xuất một giao diện mới có tính nhận diện riêng và có khả năng
phát triển thành một hệ thống UI hoàn chỉnh cho toàn bộ ứng dụng.
