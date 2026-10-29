"use strict";

const { rememberBanatReply, pickBanatReply } = require("./banat-memory");

// Banat-only local reply pools. Nothing here calls an AI service.
const groups = [
  {
    name: "bot",
    triggers: ["bot", "robot", "ai"],
    replies: [
      "ikaw boht",
      "mama mo boht",
      "boht nang boht, aning ka?",
      "ikaw mukhang boht tangga",
      "wag aning sa ope",
      "boht nganii yung lolo mo",
      "ona boht na",
      "pumapalag ka pala sa boht eh",
      "may boht pala?",
      "asan nga yung boht, kulit mo",
      "tangina, paulit-ulit lang",
      "paulit-ulit ka ba?",
      "boht ka nang boht, nagiging meme ka na",
      "bobo, wala akong pake sa sinasabi mo",
      "edi boht, kwento mo yan",
      "amoy basang aso tong kumag na to",
      "puta, baho mo, layo ka nga"
    ]
  },
  {
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
