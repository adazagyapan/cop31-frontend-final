const LANG_KEY = "cop31_lang";

const TEXT = {
  brand:            { en: "COP31 Turkiye",            tr: "COP31 Türkiye" },
  nav_map:          { en: "Map",                       tr: "Harita" },
  nav_moderation:   { en: "Moderation",                tr: "Moderasyon" },
  nav_menu:         { en: "Menu",                       tr: "Menü" },
  nav_about:        { en: "About the Project",          tr: "Proje Hakkında" },
  nav_culture:      { en: "Culture & Turkiye",           tr: "Kültür ve Türkiye" },
  nav_events:       { en: "Events & Programme",         tr: "Etkinlikler ve Program" },
  nav_signout:      { en: "Sign out",                  tr: "Çıkış yap" },
  role_admin:       { en: "moderator",                 tr: "moderatör" },
  role_user:        { en: "delegate",                  tr: "katılımcı" },

  login_tagline:    { en: "Map-based guide to the conference and Turkiye.",
                      tr: "Konferans ve Türkiye için harita tabanlı rehber." },
  login_email:      { en: "Email",                     tr: "E-posta" },
  login_password:   { en: "Password",                  tr: "Şifre" },
  login_submit:     { en: "Sign in",                   tr: "Giriş yap" },
  login_demo:       { en: "Demo accounts",             tr: "Demo hesaplar" },
  login_demo_admin: { en: "Moderator",                 tr: "Moderatör" },
  login_demo_user:  { en: "Delegate",                  tr: "Katılımcı" },
  login_err_empty:  { en: "Enter both your email and password.",
                      tr: "E-postanızı ve şifrenizi girin." },
  login_err_wrong:  { en: "That email and password don't match an account.",
                      tr: "Bu e-posta ve şifre bir hesapla eşleşmiyor." },

  layers_title:     { en: "Features",                    tr: "Özellikler" },
  layer_tourism:    { en: "Tourism & city life",       tr: "Turizm ve şehir yaşamı" },
  layer_cop31:      { en: "COP31 operations",          tr: "COP31 operasyonları" },
  layer_eco:        { en: "Climate-friendly only",     tr: "Sadece iklim dostu" },
  cat_climate:      { en: "Climate-friendly",          tr: "İklim dostu" },
  cat_plantbased:   { en: "Plant-based food",          tr: "Bitkisel beslenme" },
  cat_local:        { en: "Small local businesses",    tr: "Küçük yerel işletmeler" },
  note_section:     { en: "Leave a note",              tr: "Not bırak" },
  note_hint:        { en: "Pin your impression of a place or a session to the map.",
                      tr: "Bir mekan veya oturum hakkındaki izleniminizi haritaya bırakın." },
  note_start:       { en: "Start pinning",             tr: "Yorum bırakmaya başlayın" },
  note_cancel:      { en: "Cancel pinning",            tr: "Yorum bırakmayı iptal edin" },
  moderation_hint:  { en: "Notes are checked by a moderator before anyone else sees them.",
                      tr: "Notlar, başkaları görmeden önce bir moderatör tarafından incelenir." },

  panel_empty:      { en: "Pick a pin on the map to see what's there.",
                      tr: "Ne olduğunu görmek için haritadan bir iğne seçin." },
  panel_eco:        { en: "climate-friendly",          tr: "iklim dostu" },
  panel_notes:      { en: "Notes",                     tr: "Notlar" },
  panel_no_notes:   { en: "No notes here yet.",
                      tr: "Burada henüz not yok." },
  panel_add_note:   { en: "Add your note",             tr: "Notunuzu ekleyin" },
  panel_rating:     { en: "Rating",                    tr: "Puan" },
  panel_your_note:  { en: "Your note",                 tr: "Notunuz" },
  panel_note_ph:    { en: "What should other participants know?",
                      tr: "Diğer katılımcılar ne bilmeli?" },
  panel_audience:   { en: "Who can see it",            tr: "Kimler görebilir" },
  panel_everyone:   { en: "Everyone",                  tr: "Herkes" },
  panel_limited:    { en: "Limited audience",          tr: "Sınırlı kitle" },
  panel_send:       { en: "Send for review",           tr: "İncelemeye gönder" },
  pill_limited:     { en: "limited",                   tr: "sınırlı" },
  note_translate:   { en: "Translate",                 tr: "Çevir" },
  note_translated:  { en: "Translated by Google",      tr: "Google tarafından çevrildi" },
  note_translated_from: { en: "Translated from {lang} by Google",
                          tr: "{lang} dilinden Google tarafından çevrildi" },
  note_translated_auto: { en: "Automatically translated", tr: "Otomatik olarak çevrildi" },
  note_show_orig:   { en: "show original",             tr: "orijinali göster" },
  note_show_trans:  { en: "show translation",          tr: "çeviriyi göster" },
  note_translating: { en: "Translating…",              tr: "Çevriliyor…" },
  note_same_lang:   { en: "This note is already in your language.",
                      tr: "Bu not zaten sizin dilinizde." },
  note_tr_unavail:  { en: "Automatic translation isn't available in this browser. Connect a translation service to enable it everywhere.",
                      tr: "Otomatik çeviri bu tarayıcıda kullanılamıyor. Her yerde etkinleştirmek için bir çeviri servisi bağlayın." },

  toast_empty_note: { en: "Write something first.",    tr: "Önce bir şeyler yazın." },
  toast_sent:       { en: "Sent. A moderator will review it shortly.",
                      tr: "Gönderildi. Bir moderatör kısa süre içinde inceleyecek." },
  toast_blocked:    { en: "Not sent:",                 tr: "Gönderilmedi:" },
  toast_tap_map:    { en: "Tap the map near the place you want to note.",
                      tr: "Not bırakmak istediğiniz yerin yakınına dokunun." },
  toast_too_far:    { en: "Nothing within 250 m. Tap closer to a pin.",
                      tr: "250 m içinde bir yer yok. Bir iğneye daha yakın dokunun." },
  toast_snapped:    { en: "Snapped to",                tr: "Şuraya bağlandı:" },

  screen_contact:   { en: "Contains what looks like personal contact details.",
                      tr: "Kişisel iletişim bilgisi gibi görünen içerik var." },
  screen_language:  { en: "Contains language that breaks the community rules.",
                      tr: "Topluluk kurallarını ihlal eden ifadeler var." },
  screen_wording:   { en: "Wording flagged for a closer look.",
                      tr: "İfade, daha yakından bakılmak üzere işaretlendi." },
  screen_spam:      { en: "Looks like spam.",          tr: "Spam gibi görünüyor." },

  zone_blue:        { en: "Blue Zone — plenary",       tr: "Mavi Bölge — genel kurul" },
  zone_green:       { en: "Green Zone — side events",  tr: "Yeşil Bölge — yan etkinlikler" },

  tab_queue:        { en: "Notes awaiting review",     tr: "İnceleme bekleyen notlar" },
  tab_places:       { en: "Places",                    tr: "Mekanlar" },
  tab_all:          { en: "All notes",                 tr: "Tüm notlar" },
  admin_queue_note: { en: "Notes reach this queue after the automatic screen. Anything it blocked outright never arrives here. Approving a note publishes it at the audience its author chose.",
                      tr: "Notlar otomatik taramadan sonra bu kuyruğa gelir. Doğrudan engellenenler buraya hiç ulaşmaz. Onaylanan not, yazarının seçtiği kitleye yayımlanır." },
  admin_all_note:   { en: "The full record, including notes already approved or rejected. Approved notes can be pulled back for review if someone reports them.",
                      tr: "Onaylanmış veya reddedilmiş notlar dahil tüm kayıt. Onaylı bir not şikayet edilirse yeniden incelemeye alınabilir." },
  admin_queue_empty:{ en: "Nothing waiting. New notes will appear here.",
                      tr: "Bekleyen yok. Yeni notlar burada görünecek." },
  admin_all_empty:  { en: "No notes yet. Leave one on the map to see it here.",
                      tr: "Henüz not yok. Haritada bir not bırakın, burada görünsün." },

  form_add_place:   { en: "Add a place",               tr: "Mekan ekle" },
  form_name:        { en: "Name",                      tr: "Ad" },
  form_type:        { en: "Type",                      tr: "Tür" },
  form_lat:         { en: "Latitude",                  tr: "Enlem" },
  form_lng:         { en: "Longitude",                 tr: "Boylam" },
  form_layer:       { en: "Feature",                     tr: "Özellik" },
  form_eco:         { en: "Climate-friendly",          tr: "İklim dostu" },
  form_yes:         { en: "Yes",                       tr: "Evet" },
  form_no:          { en: "No",                        tr: "Hayır" },
  form_desc:        { en: "Description",               tr: "Açıklama" },
  form_desc_ph:     { en: "What should visitors know about it?",
                      tr: "Ziyaretçiler bu mekan hakkında ne bilmeli?" },
  form_submit:      { en: "Add place",                 tr: "Mekanı ekle" },
  form_catalogue:   { en: "Catalogue",                 tr: "Katalog" },
  col_place:        { en: "Place",                     tr: "Mekan" },
  col_coords:       { en: "Coordinates",               tr: "Koordinatlar" },
  btn_remove:       { en: "Remove",                    tr: "Kaldır" },

  btn_approve:      { en: "Approve",                   tr: "Onayla" },
  btn_reject:       { en: "Reject",                    tr: "Reddet" },
  btn_pullback:     { en: "Pull back for review",      tr: "İncelemeye geri al" },
  status_pending:   { en: "pending",                   tr: "beklemede" },
  status_approved:  { en: "approved",                  tr: "onaylı" },
  status_rejected:  { en: "rejected",                  tr: "reddedildi" },
  status_flagged:   { en: "flagged",                   tr: "işaretli" },
  meta_audience:    { en: "audience:",                 tr: "kitle:" },
  toast_published:  { en: "Published.",                tr: "Yayımlandı." },
  toast_rejected:   { en: "Rejected.",                 tr: "Reddedildi." },
  toast_requeued:   { en: "Back in the queue.",        tr: "Kuyruğa geri alındı." },
  toast_place_added:{ en: "Added. It's on the map now.", tr: "Eklendi. Artık haritada." },
  toast_removed:    { en: "Removed.",                  tr: "Kaldırıldı." },
  err_place_fields: { en: "A place needs a name and a type.",
                      tr: "Bir mekanın adı ve türü olmalı." },
  err_coords_num:   { en: "Enter both coordinates as numbers.",
                      tr: "Her iki koordinatı da sayı olarak girin." },
  err_coords_range: { en: "Those coordinates fall outside Turkey.",
                      tr: "Bu koordinatlar Türkiye dışında kalıyor." },
  confirm_remove:   { en: "Remove this place from the map?",
                      tr: "Bu mekan haritadan kaldırılsın mı?" },
  confirm_reset:    { en: "Put the demo back to its starting places and clear every note?",
                      tr: "Demo başlangıç mekanlarına dönsün ve tüm notlar silinsin mi?" },
  reset_label:      { en: "Demo data lives in this browser only.",
                      tr: "Demo verileri yalnızca bu tarayıcıda tutulur." },
  reset_button:     { en: "Reset demo data",           tr: "Demo verilerini sıfırla" },
  toast_reset:      { en: "Demo data reset.",          tr: "Demo verileri sıfırlandı." },
  about_title:      { en: "About the Project", tr: "Proje Hakkında" },
  about_lead:       { en: "A map-based guide to COP31, the UN Climate Change Conference taking place at the Antalya Expo Center from 9 to 20 November 2026.",
                      tr: "9-20 Kasım 2026 tarihlerinde Antalya Expo Center'da gerçekleşecek BM İklim Değişikliği Konferansı COP31 için harita tabanlı bir rehber." },

  about_cop_h:      { en: "What COP31 is",
                      tr: "COP31 nedir" },
  about_cop_p:      { en: "COP, or Conference of the Parties, is the annual climate summit held under the UN Framework Convention on Climate Change since 1992. It is where governments negotiate emissions targets, climate finance, and the implementation of the Paris Agreement. COP31 is the 31st session, and Turkiye hosts it in Antalya from 9 to 20 November 2026, with a World Leaders Climate Action Summit on 11–12 November. Turkiye holds the COP31 Presidency and leads the wider action agenda, while Australia leads the formal negotiations.",
                      tr: "COP, ya da \u201cTaraflar Konferansı\u201d, 1992'den beri BM İklim Değişikliği Çerçeve Sözleşmesi kapsamında her yıl düzenlenen bir iklim zirvesidir. Hükümetlerin emisyon hedeflerini, iklim finansmanını ve Paris Anlaşması'nın uygulanmasını müzakere ettiği yerdir. COP31, bu sürecin 31. oturumudur ve Türkiye ev sahipliğinde 9-20 Kasım 2026'da Antalya'da gerçekleşecek; 11-12 Kasım'da da Dünya Liderleri İklim Eylemi Zirvesi düzenlenecektir. COP31 Başkanlığı ve geniş eylem gündemi Türkiye'de, resmi müzakerelerin yönetimi ise Avustralya'dadır." },

  about_team_h:     { en: "Who is behind it",
                      tr: "Arkasındaki ekip" },
  about_team_p:     { en: "This app is developed by İklim Değişmeden Değiş (IDD ORG — Change Before Climate Change), a Turkiye- and New York-based global youth climate organization recognised and supported by the United Nations, founded in January 2023 by climate activist and writer Aydan Comba. IDD ORG works with over 1,000 volunteers across all 81 provinces of Turkiye and runs events in 57 countries. Its work has been supported by official letters from the UN Youth Office and the UNFCCC Secretariat, and it has been represented at COP28, COP29, COY18, COY19, SB60, CSW69, and the ECOSOC Youth Forum.",
                      tr: "Bu uygulama; Ocak 2023'te iklim aktivisti ve yazar Aydan Comba tarafından kurulan, Türkiye ve New York merkezli, Birleşmiş Milletler tarafından tanınan ve desteklenen küresel gençlik iklim organizasyonu İklim Değişmeden Değiş (IDD ORG) tarafından geliştirilmektedir. IDD ORG, Türkiye'nin 81 ilinde 1.000'den fazla gönüllüyle çalışmakta ve 57 ülkede faaliyet yürütmektedir. Çalışmaları BM Gençlik Ofisi ve UNFCCC Sekreteryası'nın resmi destek mektuplarıyla desteklenmiş; COP28, COP29, COY18, COY19, SB60, CSW69 ve ECOSOC Gençlik Forumu'nda temsil edilmiştir." },

  about_mission_h:  { en: "Our vision and mission",
                      tr: "Vizyon ve Misyonumuz" },
  about_mission_p:  { en: "IDD ORG's vision is to highlight that the climate crisis is not merely an environmental issue, but also a social, economic and cultural one. Accordingly, out mission is to bring together experts from diverse disciplines on common ground to analyze the climate crisis from a multidimensional perspective and develop transformative solutions. Through initiatives ranging from educational programs and awareness campaigns to research and technology, we actively engage individuals in climate action. Our activities align with the UN Sustainable Development Goals, particularly Goal 13 (Climate Action) and Goal 17 (Partnerships for the Goals).",
                      tr: "IDD ORG'un vizyonu, iklim krizinin yalnızca çevresel bir mesele değil; aynı zamanda sosyal, ekonomik ve kültürel bir sorun olduğunu vurgulamaktır. Bu doğrultuda misyonumuz, iklim krizini çok boyutlu bir bakış açısıyla analiz etmek ve dönüştürücü çözümler geliştirmek amacıyla farklı disiplinlerden uzmanları ortak bir zeminde buluşturmaktır. Eğitim programları ve farkındalık kampanyalarından araştırma ve teknolojiye uzanan çeşitli girişimler aracılığıyla, bireyleri iklim eylemine aktif olarak dahil ediyoruz. Faaliyetlerimiz, başta Amaç 13 (İklim Eylemi) ve Amaç 17 (Amaçlar İçin Ortaklıklar) olmak üzere, BM Sürdürülebilir Kalkınma Amaçları ile uyumludur." },

  about_app_h:      { en: "What this app does",
                      tr: "Bu uygulama ne yapar" },
  about_app_p:      { en: "The app presents the conference and Turkiye to the users together on one interactive map. A tourism feature shows vegan and vegetarian restaurants, eco-friendly businesses, places to stay, museums, and historic sites, with climate-friendly places highlighted. A COP31 feature shows the venue in colour-coded zones with hall features and daily sessions. Its most distinctive feature lets participants pin a note to a place or a session and share a short review, which passes moderation before others see it. The interface is bilingual in English and Turkish, built to stay usable on weak connections, and designed to run on phones as well as desktops.",
                      tr: "Uygulama, konferansı ve Türkiye'yi tek bir etkileşimli haritada kullanıcılara sunar. Turizm özelliği; vegan ve vejetaryen restoranları, çevre dostu işletmeleri, konaklama yerlerini, müzeleri ve tarihi noktaları gösterir; iklim dostu mekanlar öne çıkarılır. COP31 özelliği ise etkinlik alanını renk kodlu bölgeler, salonların özellikleri ve günlük oturumlarla gösterir. En özgün özelliği, katılımcıların bir mekana veya oturuma not bırakıp kısa değerlendirme paylaşabilmesidir. Bu notlar başkalarına görünmeden önce moderasyondan geçer. Arayüz İngilizce ve Türkçe olarak çift dillidir, zayıf bağlantılarda kullanılabilir kalacak şekilde tasarlanmıştır ve hem telefonlarda hem masaüstünde çalışır." },

  about_vision_h:   { en: "Beyond the conference",
                      tr: "Konferansın ötesinde" },
  about_vision_p:   { en: "After the summit, the catalogue of sustainable places and the notes participants leave are aimed to live on as a lasting sustainable-tourism map for Antalya and Turkiye. In this way the conference's ecological and cultural impact will be extended as a reference that future climate events can build on.",
                      tr: "Zirvenin ardından, sürdürülebilir mekânlar kataloğunun ve katılımcıların bıraktığı notların, Antalya ve Türkiye için kalıcı bir sürdürülebilir turizm haritası niteliğinde varlığını sürdürmesi hedefleniyor. Böylece konferansın ekolojik ve kültürel etkisi, gelecekteki iklim odaklı etkinliklerin üzerine inşa edebileceği bir referans kaynağı olarak genişletilmiş olacaktır." },

  culture_title:    { en: "Culture & Turkiye", tr: "Kültür ve Türkiye" },
  culture_lead:     { en: "Practical notes for your stay in Antalya, and a few things worth knowing about local life.",
                      tr: "Antalya'daki konaklamanız için pratik notlar ve yerel yaşam hakkında bilinmeye değer birkaç şey." },

  culture_antalya_h:{ en: "Antalya in November",
                      tr: "Kasım'da Antalya" },
  culture_antalya_p:{ en: "Antalya sits on the Mediterranean coast, and November is one of the milder months. It is pleasant for walking, though the season brings occasional rain and wind, so a light waterproof layer is worth packing. The conference venue, the Antalya Expo Center, is in the Aksu district east of the city, near the ancient site of Perge. The historic old town, Kaleiçi, and the Konyaaltı and Lara coastlines are all reachable from the centre.",
                      tr: "Antalya Akdeniz kıyısındadır ve Kasım, yürüyüş için keyifli, daha ılıman aylardan biridir. Ancak mevsim zaman zaman yağmur ve rüzgar getirir, bu yüzden ince bir yağmurluk almakta fayda vardır. Konferans alanı Antalya Expo Center, şehrin doğusundaki Aksu ilçesinde, antik Perge kentinin yakınındadır. Tarihi Kaleiçi ile Konyaaltı ve Lara sahilleri şehir merkezinden ulaşılabilir mesafededir." },

  culture_transport_h:{ en: "Transportation",
                      tr: "Ulaşım" },
  culture_transport_p:{ en: "Public transport is the easy, climate-friendly way to move around, and it reaches the COP31 venue directly. The Antray T1 tram line runs between the city and the Expo area, also serving the airport and the intercity bus terminal. Trams run roughly every 10–20 minutes from early morning until around midnight. Buy the rechargeable transit card AntalyaKart at the airport or a kiosk. This card works on trams, buses, and dolmuş (shared minibuses).",
                      tr: "Toplu taşıma, şehir içinde ulaşım için kolay ve çevre dostu bir yoldur ve COP31 alanına doğrudan ulaşım sağlar. Antray T1 tramvay hattı, şehir ile Expo alanı arasında çalışır ve ayrıca havaalanına ve şehirlerarası otobüs terminaline de hizmet vermektedir. Tramvaylar sabah erken saatlerden gece yarısına kadar yaklaşık 10-20 dakikada bir sefer yapmaktadır. Havaalanından veya bir büfeden yeniden şarj edilebilir AntalyaKart ulaşım kartı satın alabilirsiniz. Bu kart tramvaylarda, otobüslerde ve dolmuşlarda (paylaşımlı minibüsler) geçerlidir." },

  culture_practical_h:{ en: "Practical basics",
                      tr: "Pratik bilgiler" },
  culture_practical_p:{ en: "The currency is the Turkish lira. Card payments are widely accepted, but carry some cash for smaller vendors, markets, and dolmuş. Tap water is generally not drunk; bottled water is common, so a refillable bottle and refill points help cut plastic waste. Turkiye uses European-style two-pin plugs at 230V. English is widely spoken at the airport and in tourist areas, less so elsewhere. A few words of Turkish are always welcomed!",
                      tr: "Para birimi Türk lirasıdır. Kartla ödeme yaygın olarak kabul edilse de, küçük satıcılar, pazarlar ve dolmuşlar için yanınızda bir miktar nakit bulundurmanızda fayda var. Musluk suyu genellikle içilmez; şişe su yaygın olduğundan, yeniden doldurulabilir bir şişe ve dolum noktaları kullanmak plastik atığını azaltmaya yardımcı olur. Türkiye'de 230V gerilimle çalışan, Avrupa tipi iki uçlu fişler kullanılır. İngilizce havalimanında ve turistik bölgelerde yaygın olarak konuşulur, ancak diğer yerlerde daha az kullanılır. Birkaç kelime Türkçe bilmek her zaman memnuniyetle karşılanır!" },

  culture_sustainable_h:{ en: "Travelling sustainably",
                      tr: "Sürdürülebilir seyahat" },
  culture_sustainable_p:{ en: "Look for the 'climate-friendly' badge on the map. Places with recognised eco practices, plant-based options, transit access, and local sourcing can be found there. Choosing local, small businesses keeps the benefit of your visit in the community and its carbon footprint low. Antalya's markets are good places to buy local produce directly, and the tram network makes it realistic to attend the conference for two weeks without ever needing a car.",
                      tr: "Harita üzerinde 'iklim dostu' işaretini arayın. Burada; kabul görmüş çevre dostu uygulamalara, bitki bazlı seçeneklere, toplu taşıma erişimine ve yerel tedarik imkanlarına sahip mekanları bulabilirsiniz. Yerel ve küçük işletmeleri tercih etmek, ziyaretinizin sağladığı faydanın yerel toplulukta kalmasını sağlar ve karbon ayak izinizi düşük tutar. Antalya'daki pazarlar yerel ürünleri doğrudan satın almak için harika noktalardır; ayrıca tramvay ağı sayesinde, hiç araca ihtiyaç duymadan iki hafta boyunca konferansa katılmak son derece mümkündür." },

  ev_title:         { en: "Events & Programme", tr: "Etkinlikler ve Program" },
  ev_lead:          { en: "COP31 runs from 9 to 20 November 2026 at the Antalya Expo Center. Each of the twelve days is dedicated to a priority area of climate action.",
                      tr: "COP31, 9-20 Kasım 2026 tarihlerinde Antalya Expo Center'da gerçekleşiyor. On iki günün her biri, iklim eyleminin bir öncelik alanına ayrılmıştır." },
  ev_source:        { en: "Programme announced by the COP31 Presidency. Session times and side events are published closer to the conference. Check cop31.tr for the latest.",
                      tr: "Program COP31 Başkanlığı tarafından açıklanmıştır. Oturum saatleri ve yan etkinlikler konferansa yakın tarihlerde yayımlanır. Güncel bilgi için cop31.tr adresini kontrol edin." },
  ev_filter_all:    { en: "All days", tr: "Tüm günler" },
  ev_filter_summit: { en: "Leaders Summit", tr: "Liderler Zirvesi" },
  ev_filter_youth:  { en: "Youth & education", tr: "Gençlik ve eğitim" },
  ev_day:           { en: "Day", tr: "Gün" },
  ev_summit_badge:  { en: "World Leaders Climate Action Summit", tr: "Dünya Liderleri İklim Eylemi Zirvesi" },
  ev_venue_h:       { en: "The venue",  tr: "Etkinlik alanı" },
  ev_venue_p:       { en: "The conference takes place at the Antalya Expo Center in Aksu. The Blue Zone is the UN-managed area where negotiations, official sessions and party pavilions take place, open to accredited participants. The Green Zone is open to the wider public and hosts civil society, business and cultural programming.",
                      tr: "Konferans, Aksu'daki Antalya Expo Center'da gerçekleşir. Mavi Bölge, müzakerelerin, resmi oturumların ve taraf pavyonlarının yer aldığı, BM tarafından yönetilen ve akredite katılımcılara açık alandır. Yeşil Bölge ise geniş kamuoyuna açıktır; sivil toplum, iş dünyası ve kültürel programlara ev sahipliği yapar." },
  ev_show_map:      { en: "Show the venue on the map", tr: "Alanı haritada göster" },

  ev_d1:  { en: "Food, Agriculture and Health",            tr: "Gıda, Tarım ve Sağlık" },
  ev_d2:  { en: "Energy and Transport",                    tr: "Enerji ve Ulaştırma" },
  ev_d3:  { en: "Zero Waste",                              tr: "Sıfır Atık" },
  ev_d4:  { en: "Resilient Cities and Built Environment",  tr: "Dayanıklı Şehirler ve Yapılı Çevre" },
  ev_d5:  { en: "Finance and Trade",                       tr: "Finans ve Ticaret" },
  ev_d6:  { en: "Children, Youth, Education and Skills",   tr: "Çocuklar, Gençlik, Eğitim ve Beceriler" },
  ev_d7:  { en: "A Breath in Antalya",                     tr: "Antalya'da Bir Nefes" },
  ev_d7s: { en: "Social and cultural programmes",          tr: "Sosyal ve kültürel programlar" },
  ev_d8:  { en: "Science, Industry and Technology",        tr: "Bilim, Sanayi ve Teknoloji" },
  ev_d9:  { en: "Ocean, Seas, Nature and Land Use — Rio Synergy",
            tr: "Okyanus, Denizler, Doğa ve Arazi Kullanımı — Rio Sinerjisi" },
  ev_d10: { en: "Human and Social Development",            tr: "İnsani ve Sosyal Kalkınma" },
  ev_d11: { en: "İmece: Enhancing Implementation",         tr: "İmece: Uygulamanın Güçlendirilmesi" },
  ev_d12: { en: "Final Negotiations",                      tr: "Nihai Müzakereler" },

  filters_title:    { en: "Filters",                   tr: "Filtreler" },
  filters_close:    { en: "Close filters",             tr: "Filtreleri kapat" },
  loc_find:         { en: "Find my location",          tr: "Konumumu bul" },
  loc_you:          { en: "You are here",              tr: "Buradasınız" },
  loc_denied:       { en: "Location permission was declined.",
                      tr: "Konum izni reddedildi." },
  loc_unavailable:  { en: "Your location could not be found.",
                      tr: "Konumunuz bulunamadı." },

  panel_reviews:    { en: "reviews",                   tr: "yorum" },
  panel_no_reviews: { en: "No reviews yet",            tr: "Henüz yorum yok" },
  panel_add_btn:    { en: "Write a review",            tr: "Bu konum hakkında yorum yap" },
  panel_form_q:     { en: "What did you think of this place?",
                      tr: "Bu konum hakkında ne düşünüyorsun?" },
  panel_write_ph:   { en: "Write your review here...", tr: "Yorumunu buraya yaz..." },
  panel_visibility: { en: "Visibility",                tr: "Görünürlük" },
  panel_submit:     { en: "Send review",               tr: "Yorumu gönder" },
  panel_cancel:     { en: "Cancel",                    tr: "Vazgeç" },
  panel_see_all:    { en: "See all reviews",           tr: "Tüm yorumları gör" },
  panel_see_less:   { en: "Show fewer",                tr: "Daha az göster" },
  rating_label:     { en: "Your rating",               tr: "Puanınız" },

  wel_kicker:       { en: "9-20 November 2026 · Antalya",
                      tr: "9-20 Kasım 2026 · Antalya" },
  wel_head:         { en: "Find your way around COP31 and Turkiye",
                      tr: "COP31 ve Türkiye'de yolunuzu bulun" },
  wel_sub:          { en: "An interactive map of the conference venue and of Turkiye's climate-friendly places, including restaurants, eco-businesses, museums and places to stay.",
                      tr: "Konferans mekanının ve restoranlar, çevre dostu işletmeler, müzeler ve konaklama yerleri dahil olmak üzere Türkiye'deki iklim dostu noktaların yer aldığı interaktif bir harita." },
  wel_cta_map:      { en: "See the map",                tr: "Haritayı gör" },
  wel_cta_signin:   { en: "Sign in",                    tr: "Giriş yap" },
  wel_f1_h:         { en: "The venue, zone by zone",    tr: "Alan, bölge bölge" },
  wel_f1_p:         { en: "The Blue and Green Zones, hall functions, and where each day's sessions happen.",
                      tr: "Mavi ve Yeşil Bölgeler, salon fonksiyonları ve her günün oturumlarının nerede olduğu." },
  wel_f2_h:         { en: "Climate-friendly places",    tr: "İklim dostu mekanlar" },
  wel_f2_p:         { en: "Vegan and vegetarian restaurants, eco-certified hotels, local businesses and transit links.",
                      tr: "Vegan ve vejetaryen restoranlar, eko-sertifikalı oteller, yerel işletmeler ve toplu taşıma bağlantıları." },
  wel_f3_h:         { en: "Reviews from participants", tr: "Katılımcılardan yorumlar" },
  wel_f3_p:         { en: "Read what other delegates thought, in your own language. Sign in to add your own.",
                      tr: "Diğer delegelerin ne düşündüğünü kendi dilinizde okuyun. Kendi yorumunuzu eklemek için giriş yapın." },
  wel_by:           { en: "Built by İklim Değişmeden Değiş (IDD ORG)",
                      tr: "İklim Değişmeden Değiş (IDD ORG) tarafından geliştirilmiştir" },

  nav_signin:       { en: "Sign in",                    tr: "Giriş yap" },
  guest_label:      { en: "Browsing as a guest",        tr: "Misafir olarak geziniyorsunuz" },
  guest_to_review:  { en: "Sign in to write a review",  tr: "Yorum yazmak için giriş yapın" },
  guest_prompt:     { en: "You need an account to write a review.",
                      tr: "Yorum yazmak için bir hesabınız olmalı." },
  guest_note_mode:  { en: "Sign in to pin a review to the map.",
                      tr: "Haritaya yorum bırakmak için giriş yapın." },
  login_back:       { en: "Back to the map",            tr: "Haritaya dön" },

  about_team_link:  { en: "Visit the IDD ORG website", tr: "IDD ORG web sitesini ziyaret edin" },
  about_team_insta: { en: "Instagram",                 tr: "Instagram" },

  gt_disclaimer_h:  { en: "About translations",        tr: "Çeviriler hakkında" },
  gt_disclaimer_p:  { en: "Reviews written in other languages can be translated with Google Translate. Translations are automatic and may not be exact; the original is always one tap away.",
                      tr: "Başka dillerde yazılmış yorumlar Google Çeviri ile çevrilebilir. Çeviriler otomatiktir ve tam doğru olmayabilir; orijinal metne her zaman tek dokunuşla ulaşabilirsiniz." },
  gt_disclaimer_legal: { en: "THIS SERVICE MAY CONTAIN TRANSLATIONS POWERED BY GOOGLE. GOOGLE DISCLAIMS ALL WARRANTIES RELATED TO THE TRANSLATIONS, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, RELIABILITY, AND ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.",
                         tr: "THIS SERVICE MAY CONTAIN TRANSLATIONS POWERED BY GOOGLE. GOOGLE DISCLAIMS ALL WARRANTIES RELATED TO THE TRANSLATIONS, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, RELIABILITY, AND ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT." },

  img_missing:      { en: "Photo goes here",           tr: "Fotoğraf buraya" },

  alt_about_cop:  { en: "Delegates in a plenary hall at a previous UN climate conference",
                      tr: "Önceki bir BM iklim konferansında genel kurul salonundaki delegeler" },
  cap_about_cop:  { en: "A plenary session at a previous COP. Photo: [credit]",
                      tr: "Önceki bir COP'ta genel kurul oturumu. Fotoğraf: [kaynak]" },

  alt_about_team: { en: "IDD ORG members at a UN climate conference",
                      tr: "Bir BM iklim konferansında IDD ORG üyeleri" },
  cap_about_team: { en: "IDD ORG at COP29. Photo: IDD ORG",
                      tr: "COP29'da IDD ORG. Fotoğraf: IDD ORG" },

  alt_cul_antalya:{ en: "The historic Kaleiçi old town in Antalya",
                      tr: "Antalya'daki tarihi Kaleiçi" },
  cap_cul_antalya:{ en: "Kaleiçi, Antalya's old town. Photo: [credit]",
                      tr: "Antalya'nın tarihi merkezi Kaleiçi. Fotoğraf: [kaynak]" },

  alt_cul_sustain:{ en: "Fresh local produce at a market in Antalya",
                      tr: "Antalya'da bir pazarda taze yerel ürünler" },
  cap_cul_sustain:{ en: "Local produce at an Antalya market. Photo: [credit]",
                      tr: "Antalya'da bir pazarda yerel ürünler. Fotoğraf: [kaynak]" },

  pwa_install:      { en: "Install the app",           tr: "Uygulamayı yükle" },

  admin_only:       { en: "That page is for moderators only.",
                      tr: "Bu sayfa yalnızca moderatörler içindir." }
};

function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "en" || saved === "tr") return saved;
  return navigator.language && navigator.language.startsWith("tr") ? "tr" : "en";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  window.location.reload();
}

function toggleLang() {
  setLang(getLang() === "en" ? "tr" : "en");
}

function t(key) {
  const entry = TEXT[key];
  if (!entry) return key;
  return entry[getLang()] || entry.en;
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(el.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });

  document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
    el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
  });

  document.documentElement.lang = getLang();
}
