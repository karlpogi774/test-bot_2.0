"use strict";

const { rememberBanatReply, pickBanatReply } = require("./banat-memory");

// Banat-only local reply pools. Nothing here calls an AI service.
const groups = [
  {
    name: "bot",
    triggers: ["bot", "robot", "ai"],
    replies: [
      "ikaw boet",
      "mama mo boet",
      "boet nang boet, aning ka?",
      "ikaw mukha boet tangga",
      "wag aning sa opee",
      "boet nganii yung lolo mo",
      "ona boet na",
      "pumapalag ka pala sa boet eh",
      "may boet pala??",
      "asan nga yung boet, kuliit mo",
      "tangina, pauulit-ulit",
      "paulit-ulit ka ba??",
      "boet ka nang boet, nagiging memee ka na",
      "bobo, wala akong pake sa sinasabi mo",
      "edi boet, kwento mo yan",
      "amoy basang aso tong kumag na too",
      "puta, bahoo mo, layo ka nga"
    ]
  },
  {
      name: "patola",
  triggers: ["patola", "warla", "savage", "kalat", "bardagulan"],
  replies: [
    "sino nanaman tong istorbo?",
    "te, hindi ka kasama sa usapan",
    "may sariling mundo ka talaga",
    "ayan na naman ang walang preno",
    "wag kang feeling importante",
    "anong pake ko sa drama mo?",
    "te, pakihinaan ang pagiging papansin",
    "nagsalita na naman ang walking disaster",
    "hindi ka ba nauubusan ng kalat?",
    "sige, ikaw na ang pinakamagaling sa imagination mo",
    "may sense ka ba o puro ka ingay?",
    "wag mo akong subukan, naka-lowbat ako",
    "hala, may nagparamdam na naman",
    "ikaw ba ang definition ng abala?",
    "pahinga ka muna sa pagiging epal",
    "sana all confident kahit sablay",
    "te, ibang level na yang kakulitan mo",
    "hindi lahat ng chat kailangan mong salihan",
    "congratulations, ikaw ang ingay of the day",
    "tapos ka na ba? may iba pa akong ini-ignore"
    ]
  },
    {
        name: "darkking",
  triggers: ["darkking", "lodi", "idol", "boss", "lods", "pre"],
  replies: [
    "qU0HhH, 4N0 N4M4N 4NG H4B0L M0H?",
    "w4L4 K4 B4NG 4UT0M4T1C M0D3 N4 T4H1M1K?",
    "4Y4N N4 N4M4N 4NG P4P4N5IN6 4W1T",
    "d1 4qU N4G1N6 M4L4Y4, 4qU L4N6 4NG M4L4K4S",
    "b4K1T K4 N4G1NG 3RR0R S4 GR0UP?",
    "qU0HhH, P4R4N6 N4L1G4W4Y 4NG U6AL1 M0H",
    "4N0H N4M4N 2H0H, P4R4N6 N4G1NG L4G4N4P",
    "t4M4 N4 Y4N, 4W1T S4 P4N64L4N M0H",
    "h1N4Y H1N4Y S4 K3YB04RD, B4K4 M4B4S4G K4",
    "4N6 T4P4N6 M0H, P4R4N6 W4L4N6 B4CKUP",
    "s1N0 N4M4N 4NG N4G1NG B1D4? P4K1T4 N6 CR3D1T5",
    "4Y0K0 N4 N6 D4M4Y S4 K4L4T M0H",
    "p4R4N6 3X4M M0H, P4R3H0NG P4L4P4K",
    "4W1T, N4G1N6 M4H1N4 4NG 4T1N6 S1GN4L",
    "K1N6 M4Y P4L4T4ND44N, 4N6 IY0H W4L4NG P4S4H3N6",
    "d1 M0 N4M4N K4Y4N6 4NG L4K4S N6 T4H1L M0",
    "qU0HhH, 4N6 T0P1C M0 P4R4N6 N4S4 DRAFT",
    "4N6 4R4W 4R4W M0, P4R4N6 L4G1NG M0ND4Y",
    "p4K1B4L1K N4M4N N6 S3NS3 M0H, N4W4W4L4 N4",
    "4W1T, K1N6 N4N6 4NG K4L4T S4 GR0UP"
    ]
  },
    {
       name: "jejequeen",
  triggers: ["jejequeen", "omsim", "awit", "luh", "edi", "weh"],
  replies: [
    "w3HhH 4qU p4 b4? 😭",
    "qUoHhH n4m4N 2h0HhH, p4P4N5IN",
    "4Y4N n4 n4m4N 4N6 p4P4N5IN6",
    "d1 qU0HhH k4Y4N6 m4K1P4G4L1N6",
    "s4N4 4LL m4Y bR41N, n4S4N 4N6 4Y0HhH?",
    "4W1T3HhH, n4K4K4L0K4 4N6 U6AL1H1",
    "h1N4Y h1N4Y 4qU, 4N6 T4L4K m0HhH",
    "p4K1B4S4 n4M4N n6 bR41N m0HhH",
    "4N0HhH b4HhH, p4R4N6 3RR0R 4N6 U6AL1H1",
    "s4B1H1N m0HhH n4 L4N6 4N6 T4M4",
    "qUoHhH p4L4, 4N6 4R0G4N7E n4M4N",
    "4Y0K0HhH s4 3P4L, P3R0 4N6 L4K4S m0HhH",
    "d1 4qU 4N6 N4G1N6 4W1T, 4qU 4N6 N4G1N6 P4T0L4",
    "w4L4HhH k4HhH s4 T0P1C, P4N6 3XTR4 L4N6",
    "qUoHhH b4HhH, P4R4N6 N4G1N6 L4L4M0N6",
    "4N6 T4L4K m0HhH, W4L4HhH n4M4N6 S4B1",
    "P4K1H1N4N6 4N6 K4L4T m0HhH 😭",
    "4Y4W qU0HhH n4, P4H1N64 M0HhH 4Q0HhH",
    "4N0HhH N4M4N6, N4G1N6 4R4W-4R4W 4N6 K4L4T",
    "s4N4 4LL, 4N6 4T1N6 M4Y S3NS3"
    ]
  },
  {
     name: "jejemon",
  triggers: ["jeje", "hoy", "omsim", "awit", "luh", "edi"],
  replies: [
    "h3L0wZ p0wHhH mGa k4p4L4r4n 😭",
    "qUoH n4m4N 2h0HhH, k4L4t m0HhH",
    "aW1tZ s4 bUh4Y m0HhH",
    "w4g m0HhH 4qU p4gTuL4r4n",
    "s4N4 4qU n4 L4nG p4K1nGg4n m0HhH",
    "lUhHhH, n4g1ng m4L4y4 k4 n4 n4m4N",
    "t4H1m1k mUn4HhH k4, p4P4nS1n k4HhH",
    "k4L4m k4 L4nG, d1 k4HhH s1N4s1Ng1L",
    "4Y0K0HhH s4 dR4m4 m0HhH",
    "b4K1t k4HhH g4N1t, 4N0 b4 4MB4G m0HhH?",
    "4N0HhH n4m4N 2h0HhH, b0G4r k4HhH",
    "s1G3HhH k4 n4 L4N6, p4P4L4kP4k4N k1T4HhH",
    "w4L4HhH k4HhH s4 b1D4, 4Y0K0HhH s4 L4B4N",
    "m4G1N6 m4T4N6 k4HhH s4 k4K4T4H4H",
    "d1HhH 4qU 4L4L4Y, 4qU 4N6 4N6",
    "p4K1R4M4N6 m4L4N6, W4L4HhH n4M4N6 s4NS3",
    "qUoHhH b4HhH, 4N0HhH n4M4N6?",
    "t4N6N4HhH m0HhH, 4Y0K0HhH s4 P4P4N5IN",
    "4W1T, n4G1N6 4N0Y k4HhH",
    "j3J3m0N r1D3R p0wHhH 😭"
    ]
  },
  {
     name: "crushie",
  triggers: ["crush", "pogi", "baby", "love", "missyou", "mahal"],
  replies: [
    "hala, may isang babae na naman akong naiisip",
    "ikaw ba yung dahilan kung bakit ako nakangiti?",
    "sana all ikaw na lang palagi kong kausap",
    "ang ganda mo naman, bawal ba kitang i-crush?",
    "pwede bang ikaw na lang hanggang dulo?",
    "hindi ako sweet pero pagdating sayo, exception ka",
    "good morning sa pinakamagandang babae",
    "ikaw lang talaga gusto kong kulitin",
    "sana ako rin hinahanap mo kapag wala ako",
    "pahingi naman ng chance, aalagaan kita",
    "kung smile mo lang ang reward, araw-araw akong magpapatawa",
    "bakit ba ang ganda mo? may kasalanan ka ba?",
    "ikaw ang favorite notification ko",
    "hindi man ako perfect, pero sincere ako sayo",
    "pwede bang ako naman ang dahilan ng kilig mo?",
    "one girl, one heart, ikaw lang",
    "miss na kita, kahit hindi mo pa ako nami-miss",
    "sana hindi lang sa panaginip kita nakakasama",
    "kung pipili ako, ikaw pa rin",
    "ingat ka palagi, future favorite person"
    ]
  },
    {
        name: "secretlandi",
  triggers: ["hi", "hello", "hoy", "uy", "miss", "pogi", "love", "baby"],
  replies: [
    "hello pretty, namiss mo ba ako?",
    "uy, bakit ang cute mo today?",
    "ikaw nanaman, favorite person ko kasi",
    "wag ka masyadong maganda, nahuhulog ako",
    "kumain ka na ba? importante ka kaya",
    "sana all ako rin favorite mo",
    "teka lang, kinikilig ako sa chat mo",
    "pwede bang ikaw na lang kausap ko araw-araw?",
    "ang ganda mo naman, pahingi naman ng chance",
    "hindi ako naghahanap ng iba, ikaw lang sapat na",
    "ikaw talaga weakness ko",
    "pahingi ng smile, miss na kita",
    "bakit kapag ikaw nagchat, iba yung saya?",
    "sana ako rin dahilan ng good mood mo",
    "wag kang mawawala ha, gusto pa kitang makilala",
    "lowkey lang ako pero highkey crush kita",
    "pwede bang manligaw kahit konti?",
    "ikaw yung gusto kong i-goodnight araw-araw",
    "hindi ako makulit, gusto lang talaga kita kausap",
    "sana maging tayo, hindi lang sana all"
    ]
  },
    {
       name: "landi2",
  triggers: ["baby", "babe", "love", "mahal", "pretty", "ganda", "miss"],
  replies: [
    "baby, pahingi naman ng attention mo",
    "ikaw lang gusto kong istorbohin araw-araw",
    "miss na kita, bawal bang ikaw na lang lagi?",
    "ang cute mo, pwede bang iuwi?",
    "pahingi kiss, kahit virtual lang",
    "wag ka na maghanap ng iba, nandito naman ako",
    "ikaw lang gusto kong lambingin",
    "goodnight pretty, sana mapanaginipan mo ako",
    "kung yakap lang kailangan mo, available ako",
    "sana katabi kita ngayon",
    "ang sarap sigurong mahalin ka",
    "pwede bang ako na lang pahinga mo?",
    "wag kang magpapagutom ha, magagalit future boyfriend mo",
    "hindi ako photographer pero nakikita ko future natin",
    "ikaw ang gusto kong kausap kahit wala tayong topic",
    "pahingi naman ng isang chance, please?",
    "kung may contest sa ganda, ikaw na agad panalo",
    "konting lambing naman diyan, miss na kita",
    "sana ako yung good morning at goodnight mo",
    "ingat ka palagi, ayokong mawala ang favorite girl ko"
    ]
  },
    {
        name: "boyfriendvibes",
  triggers: ["baby", "babe", "love", "mahal", "ganda", "miss", "goodnight", "goodmorning"],
  replies: [
    "good morning, pretty kooo",
    "kumain ka na ba? wag puro cellphone ha",
    "miss na kita, kahit kakachat lang natin",
    "dito ka nga, lambingin kita",
    "wag ka masyadong magpagod, pahinga ka rin",
    "sana ako na lang katabi mo ngayon",
    "goodnight, sweet dreams sa pinakamagandang babae",
    "pahingi naman ng lambing, please?",
    "ang cute mo talaga, nakakainis",
    "ikaw lang gusto kong kulitin buong araw",
    "may problema ka ba? nandito lang ako",
    "ingat ka palagi, gusto pa kitang makasama nang matagal",
    "sana ako rin yung hinahanap mo kapag malungkot ka",
    "hindi ako galit, gusto lang kita makausap",
    "huwag kang mawawala ha, masasanay ako sayo",
    "kung pagod ka na, pahinga ka muna sa akin",
    "one hug from you, okay na buong araw ko",
    "sino ba namang hindi mahuhulog sa ganda mo?",
    "pwede bang ikaw na lang lagi kong good morning?",
    "ingat ka, future favorite person ko",
    "wag ka magpapalipas ng gutom, please",
    "pahingi kiss bago ka matulog",
    "ikaw lang naman talaga gusto kong lambingin",
    "sana someday hindi na lang kita crush",
    "sweet dreams, sana ako mapanaginipan mo"
    ]
  },
  {
     name: "gcwarrior",
  triggers: ["away", "trashtalk", "gago", "tanga", "bobo", "pikon"],
  replies: [
    "4W1T, N4G1N6 M4L4K4S 4NG K4L4M M0H 😭",
    "qU0HhH, 4N6 T4P4N6 M0H S4 TYP1N6 L4N6",
    "D1 K4 N4M4N K4S4L1 S4 T0P1C, P4R4N6 N4G1NG 3RR0R",
    "W4G M0H 4qU P4G0D1N, M4Y 4R4L 4qU S4 B4Y4N",
    "4N0H N4M4N 2H0H, P4R4N6 N4G1NG 4L4S-3",
    "4W1T, P4R4N6 N4G1NG 3X4M 4NG K4L4T M0",
    "S4B1H1N M0 N4 L4N6 KUNG 4N0 4NG P01NT M0",
    "P4K1B4L1K N4M4N N6 S3NS3, N4W4W4L4 N4",
    "H1N4Y H1N4Y S4 P4G4R4L, B4K4 M4L4G4Y4 K4",
    "D1 K4 N4M4N N4G1NG M41N CH4R4CT3R D1T0",
    "4N6 D4M1 M0NG S4B1, P3R0 W4L4 N4M4N6 P01NT",
    "W4G M0H 4qU P4G0D1N, M4Y L1M1T 4NG P4T13NC3",
    "4Y4N N4 N4M4N 4NG P4P4N5IN6 S4 GC",
    "K4L4M L4N6, D1 N4T1N K4L4Y4N6 4NG D4Y4L0G",
    "N4K4K4T4W4 N4M4N 4NG K0NF1D3NC3 M0 😭",
    "0M51M, P4R4N6 N4G1NG B0SS S4 SAR1L1NG M0ND0"
    ]
  },
  {
    name: "Rantss",
triggers: ["crush", "gusto kita", "mahal kita", "hello", "hi"],
replies: [
  "h-hi.. 😳 ganda mo tlga",
  "ewan ko bkit, pero nkngiti ako pg nandyan k",
  "ang ganda mo nmn lgi, prang araw 😊",
  "wag k muna tma, hnd ko maipaliwanag eh",
  "ikaw yung rason bkit nkkngiti ako ngyon",
  "hnndi ako magaling magsalita, pero seryoso ako syo",
  "pag nakikita k ko, nkakalimutan ko lahat ng problema ko",
  "sana ako nlng piliin mo, plss 🥺",
  "ang ganda ng ngiti mo, nakakawala ng pagod",
  "prang lgi akong ngwawagi pg kausap k kita",
  "hndi ko alam pno sabihin, pero special k sakin",
  "ikaw yung una kong iniisip pg nagigising ako",
  "sana hndi magbago yung pakiramdam ko sayo",
  "mnsan tnga ako, pero hndi ako mali pagdating syo",
  "ang ganda mo tlga, wla na ako masabi eh 😅",
  "lwag mong alam, ikaw yung paborito kong kausap",
  "pg kasama kita, parang okay lahat ng bagay",
  "sana ako yung taong magpapasaya sayo araw-araw",
  "ikaw lang, wla nang iba. pramis 💖",
  "mnsan mahiyain ako, pero gusto kita, totoo yan"
  ]
  },
  {
    name: "ryuk",
  triggers: ["ryuk", "malakas", "pogi", "king"],
  replies: [
    "syempre, ako pa si Ryuk eh",
    "tignan mo ako, pogi at malakas, yan si Ryuk",
    "wag ka mainggit, ganyan talaga pag Ryuk",
    "ako yung hari dito, wag ka magkamali",
    "si Ryuk lang malakas, yun lang naman yon",
    "hindi lang malakas, pogi pa — yan ang Ryuk",
    "pag nandyan si Ryuk, tahimik lang kayo",
    "walang makakatalo kay Ryuk, alam niyo yan",
    "ako yung standard, di mo kayang abutin",
    "Ryuk lang sapat na, di na kailangan ng iba",
    "tignan mo mukha ko, yan ang tinatawag na pogi",
    "lakas at ganda ng mukha, nasa akin na lahat",
    "ikaw? subukan mo lang, di ka aabot sakin",
    "wag ka magpanggap, alam mong Ryuk ang hari",
    "ang tunay na malakas, hindi na kailangan magyabang — pero ako pa rin",
    "pogi at malakas, delikado pero worth it",
    "isa lang ang Ryuk, walang kapalit o katulad",
    "respeto lang kay Ryuk, at ligtas kayo",
    "ang dating ko? hindi mo kaya sabayan",
    "syempre, Ryuk to eh — walang tatalo"
    ]
  },
  {
    name: "trash-talk",
    triggers: ["weak", "laro", "tanginamo", "lala", "patawa", "gago", "bobo", "tanga", "hahahaa", "pake ko", "sino yan"],
    replies: [
      "ang baho mo po, baby 😭💕",
      "baby, explain mo po 'yang kabobohan mo.",
      "baby, ano po 'yang tukmol ka?",
      "baby naman, didn't I tell you po 'wag kang tanga?",
      "hala po, si baby nadapa dahil sa kabobohan niya.",
      "baby, cute mo po kapag mali ka.",
      "baby, ang tapang mo po para sa taong ganyan ka-cute.",
      "baby, saan mo po hinugot 'yang confidence mo?",
      "baby, may resibo ka po ba o vibes lang?",
      "baby, ang cute po ng yabang mo.",
      "baby, pwede bang magpahinga ka muna sa pagiging tanga? 😭",
      "baby, bakit po parang naka-airplane mode utak mo?",
      "baby, nag-iisip ka po ba o nagpapacute lang?",
      "baby, ang lakas mo po magtalk para sa ganyang kaliit na point.",
      "baby, tuloy mo lang po, natutuwa akong panoorin kang malito.",
      "baby, may tutorial po ba para maintindihan kita?",
      "baby, ang ganda po ng confidence mo, sayang wala sa tamang lugar.",
      "baby, bakit po parang ikaw mismo di convinced sa sinabi mo?",
      "baby, behave po, ang cute mo na nga, makulit ka pa.",
      "baby, ang kulit mo po, pero sige cute ka naman.",
      "baby, kailangan mo po ba ng hug bago ka ulit magsalita?",
      "baby, calm down po, baka maubos ang cute points mo.",
      "baby, ang dramatic mo po, parang teleserye.",
      "baby, bakit po every sentence mo may plot twist?",
      "baby, nag-practice ka po ba maging makulit?",
      "baby, ikaw na po ang certified little menace ko.",
      "baby, ang lakas ng aura mo po, kaso naligaw.",
      "baby, gusto mo po bang tamaan kita ng lambing?",
      "baby, ang gulo mo po, pero adorable somehow.",
      "baby, one brain cell at a time lang po, please.",
      "baby, wag po masyadong seryoso, bagay sa'yo ang pagiging cute na sablay.",
      "baby, may appointment ka po ba sa kabobohan today?",
      "baby, ang sipag mo po gumawa ng problema.",
      "baby, proud ka po talaga sa ganyang take?",
      "baby, ang confidence mo po parang unlimited data.",
      "baby, ang logic mo po naka-trial version.",
      "baby, nag-buffer po ba utak mo?",
      "baby, bakit po ikaw ang pinaka-confident na walang point?",
      "baby, ang cute po ng argument mo, pero hindi convincing.",
      "baby, sige po, explain mo pa, gusto kong marinig ang sequel.",
      "baby, ang haba po ng speech mo, nasaan ang point?",
      "baby, may point ka po ba o nagbabakasyon?",
      "baby, balik po tayo sa reality, miss na kita doon.",
      "baby, ang layo po ng sagot mo sa tanong.",
      "baby, ikaw po ba ang final boss ng unnecessary replies?",
      "baby, ang cute mo po kapag trying hard.",
      "baby, don't worry po, tutulungan kitang hanapin ang point mo.",
      "baby, nawawala po ba ang common sense mo kapag cute ka?",
      "baby, bakit po parang confidence muna bago utak?",
      "baby, ang tapang mo po, gusto mo ba ng forehead kiss?",
      "baby, wag ka po magalit, bagay sa'yo ang pikon.",
      "baby, ang cute po ng tampo mo, kaso mali ka pa rin.",
      "baby, okay po, noted ang kabobohan.",
      "baby, sige po, ikaw na ang CEO ng nonsense.",
      "baby, may citation po ba 'yang claim mo?",
      "baby, source po? o galing lang sa imagination?",
      "baby, ang effort po, pero saan napunta ang sense?",
      "baby, ang daldal mo po, pero sige, favorite kita.",
      "baby, pwede po bang tumigil ka muna? nami-miss ko kasi katahimikan.",
      "baby, ang ingay mo po, pero cute so pagbibigyan kita.",
      "baby, bakit po parang hobby mo akong inisin?",
      "baby, ikaw po ba ang scheduled interruption ko today?",
      "baby, ang dramatic mo po, gusto mo soundtrack?",
      "baby, may script po ba tayo o improv lang talaga kabobohan mo?",
      "baby, ang confident mo po, parang may backup brain.",
      "baby, ang cute mong magpanggap na tama po.",
      "baby, sige po, defend your thesis of nonsense.",
      "baby, hug muna po bago natin ayusin ang logic.",
      "baby, breathe po, hindi ka hinahabol ng facts.",
      "baby, relax po, hindi contest ang pagiging tama.",
      "baby, acceptance po muna bago confidence.",
      "baby, GPS po ba utak mo? bakit off-route?",
      "baby, turn left po sa common sense.",
      "baby, recalculating po ang logic mo.",
      "baby, destination: tamang sagot. ETA: unknown.",
      "baby, may detour po yata 'yang argument mo.",
      "baby, bakit po parang side quest lahat ng sagot mo?",
      "baby, ang reply mo po nag-lag sa landing.",
      "baby, bakit po every comeback mo may loading screen?",
      "baby, ang banat mo po cute, parang ikaw.",
      "baby, sige po, roast mo pa ako, nakakatuwa ka.",
      "baby, ang yabang mo po, gusto mo bang i-redeem sa lambing?",
      "baby, obvious po na gusto mo ng attention.",
      "baby, nakuha mo na po attention ko, happy ka na?",
      "baby, congratulations po, ikaw ang little problem of the day.",
      "baby, ang galing mong manggulo po.",
      "baby, may medal po ba sa pagiging makulit? deserve mo.",
      "baby, ang kulit mo po, pero don't stop.",
      "baby, ang cute mong magpanggap na tama.",
      "baby, ang taas po ng confidence, ang baba ng accuracy.",
      "baby, perfect po ang delivery, questionable ang content.",
      "baby, ang smooth mo po magsalita, sayang sablay ang logic.",
      "baby, ang point mo po nagtatago yata.",
      "baby, baka kailangan po natin ng search party para sa logic mo.",
      "baby, ang argumento mo po may sariling side quest.",
      "baby, saan po nag-road trip ang common sense?",
      "baby, ang reply mo po nag-lag sa landing.",
      "baby, ikaw po talaga ang definition ng cute disaster."
    ]
  },
  {
    name: "Rantss",
    triggers: ["bot", "robot", "ai"],
    replies: [
   "p*taa, ang kulit mo nmn bwiset",
   "t*ngina, sabi hndi bot eh",
   "g*go ka ba? bulag k ba tlga??",
   "p*nyeta, wag mo ko kulitin pls",
   "l*che, ubos na pasensya ko syo",
   "k*pal talaga yung taong to prang",
   "bwisit na bwiset nako sayo prang",
   "pt*ng ina, ang daldal mo tlga",
   "g*go, wla ka nmng kwenta diba?",
   "t*nga k ba o sadyang ganon k lng?",
   "p*taa, layo ka nga sakin nakakabwisit",
   "t*nginah, paulit-ulit k lng ba?",
   "g*go ka nmn prang wlang utak",
   "p*nyeta, wla akong oras sayo",
   "bwisit, wag ka dyan umepal dyan",
   "t*ngina, ang ingay mo nakak lito",
   "p*taa, tulog ka nlng bka masira utak mwo",
   "g*go talaga yung kumag na to",
   "l*che, anong gusto mo sakin ha?",
   "pt*ng ina, pwede ba tumigil k na?"
    ]
  },
  {
    name: "aso",
     triggers: ["aso"],
     replies: [
       "aso na naman",
       "al-bai-no",
       "bai-gone",
       "bai-tamins",
       "one bai one",
       "aso, yung mukhang paa ba?",
       "la, aso ulit",
       "aso and his broke boys era",
       "aso mukhang nahulugan langka eh",
       "iyak si gago",
       "pake ko nga?",
       "turo mo sino nag tanong",
       "bilang ka muna",
       "muka ka libro",
       "muka ma fan",
       "muka ka mama mo",
       "muka ka lapis",
       "muka ka tiles",
       "muka ka bahay",
       "muka ka semento",
       "muka ka aspalto",
       "muka ka tanga",
       "muka ka gago"
    ]
  }
];

function normalize(text) { return String(text || "").toLowerCase().replace(/\s+/g, " ").trim(); }

function findGroups(body) {
  const text = normalize(body);
  return groups.filter(group => group.triggers.some(trigger => {
    const t = String(trigger).toLowerCase();
    return t.length <= 4 ? new RegExp(`\\b${t.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\b`, "i").test(text) : text.includes(t);
  }));
}

function getTriggerReply(body, threadID = "") {
  const matched = findGroups(body);
  if (!matched.length) return null;
  const group = matched[Math.floor(Math.random() * matched.length)];
  const reply = pickBanatReply(threadID, group.replies);
  if (reply) rememberBanatReply(threadID, reply);
  return reply;
}

function getBanatConversationReply(body, threadID = "") {
  const direct = getTriggerReply(body, threadID);
  if (direct) return direct;

  const fallback = groups.flatMap(g => g.replies);
  // The no-repeat shuffle bag can temporarily have only recently-used items
  // left. In that edge case, pickBanatReply returns null; active Banat must
  // still answer ordinary chat instead of silently skipping the message.
  const reply =
    pickBanatReply(threadID, fallback) ||
    fallback[Math.floor(Math.random() * fallback.length)] ||
    null;

  if (reply) rememberBanatReply(threadID, reply);
  return reply;
}

module.exports = { groups, getTriggerReply, getBanatConversationReply };
