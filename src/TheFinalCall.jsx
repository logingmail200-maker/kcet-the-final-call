import React, { useState, useMemo, useEffect, useRef } from "react";

const RAW_DATA = {"MSRIT": {"AERO SPACE ENGINEERING": {"1G": 8783, "2AG": 8600, "2BG": 12042, "3AG": 5600, "3BG": 5362, "GM": 5362, "GMK": 9756, "GMR": 7497, "S1G": 44599, "S2G": 24560, "S3G": 18867, "S4G": null, "STG": null}, "ARTIFICIAL INTELLIGENCE AND DATA SCIENCE": {"1G": null, "2AG": 6096, "2BG": 6457, "3AG": 4091, "3BG": 2800, "GM": 2800, "GMK": 8746, "GMR": 6302, "S1G": 16833, "S2G": 22986, "S3G": null, "S4G": null, "STG": 14336}, "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING": {"1G": 3290, "2AG": 6088, "2BG": 7173, "3AG": 7372, "3BG": 6442, "GM": 2512, "GMK": null, "GMR": 5151, "S1G": 24384, "S2G": 15860, "S3G": null, "S4G": null, "STG": 8665}, "BIO-TECHNOLOGY": {"1G": null, "2AG": 14582, "2BG": 16880, "3AG": 17245, "3BG": 19227, "GM": 9574, "GMK": 18976, "GMR": 14430, "S1G": 25528, "S2G": 33671, "S3G": 37206, "S4G": null, "STG": null}, "CHEMICAL ENGINEERING": {"1G": 44336, "2AG": 37372, "2BG": 42186, "3AG": 19622, "3BG": 17807, "GM": 17807, "GMK": null, "GMR": 35266, "S1G": 95451, "S2G": 126622, "S3G": null, "S4G": null, "STG": null}, "CIVIL ENGINEERING": {"1G": 36652, "2AG": 42514, "2BG": 42805, "3AG": 26747, "3BG": 22496, "GM": 23000, "GMK": null, "GMR": 40750, "S1G": 37580, "S2G": 32559, "S3G": null, "S4G": null, "STG": null}, "COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)": {"1G": 3020, "2AG": 5509, "2BG": 15252, "3AG": 6564, "3BG": 5983, "GM": 2210, "GMK": 7672, "GMR": 4931, "S1G": 14557, "S2G": 10725, "S3G": null, "S4G": null, "STG": 11940}, "COMPUTER SCIENCE AND ENGINEERING": {"1G": 2710, "2AG": 4864, "2BG": 8588, "3AG": 6782, "3BG": 6737, "GM": 1813, "GMK": 8048, "GMR": 4322, "S1G": 14904, "S2G": 10348, "S3G": null, "S4G": null, "STG": 9508}, "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)": {"1G": 4418, "2AG": 5950, "2BG": 8883, "3AG": 9056, "3BG": 10496, "GM": 2637, "GMK": null, "GMR": 4572, "S1G": 15024, "S2G": 13435, "S3G": null, "S4G": null, "STG": 10159}, "ELECTRICAL & ELECTRONICS ENGINEERING": {"1G": 22853, "2AG": 21004, "2BG": 34376, "3AG": 21353, "3BG": 36890, "GM": 8009, "GMK": 22894, "GMR": 21451, "S1G": 35606, "S2G": 58934, "S3G": null, "S4G": null, "STG": null}, "ELECTRONICS AND COMMUNICATION ENGG": {"1G": 5478, "2AG": 5240, "2BG": 13940, "3AG": 9024, "3BG": 5752, "GM": 2422, "GMK": 11648, "GMR": 5184, "S1G": 34177, "S2G": 19922, "S3G": null, "S4G": null, "STG": 15237}, "ELECTRONICS AND INSTRUMENTATION ENGINEERING": {"1G": 23173, "2AG": 18654, "2BG": null, "3AG": 11584, "3BG": 53108, "GM": 6886, "GMK": null, "GMR": 16177, "S1G": 75675, "S2G": 47370, "S3G": 31715, "S4G": null, "STG": null}, "ELECTRONICS AND TELECOMMUNICATION ENGINEERING": {"1G": null, "2AG": 11966, "2BG": null, "3AG": 5934, "3BG": 4733, "GM": 4800, "GMK": 23120, "GMR": 13958, "S1G": 23378, "S2G": 35050, "S3G": 22104, "S4G": null, "STG": 21643}, "INDUSTRIAL ENGINEERING & MANAGEMENT": {"1G": 29996, "2AG": 37702, "2BG": null, "3AG": 27371, "3BG": 36594, "GM": 21148, "GMK": null, "GMR": 41112, "S1G": 198107, "S2G": 76125, "S3G": null, "S4G": null, "STG": null}, "INFORMATION SCIENCE AND ENGINEERING": {"1G": 6630, "2AG": 5856, "2BG": 9318, "3AG": 14666, "3BG": 8806, "GM": 3162, "GMK": null, "GMR": 6339, "S1G": 29409, "S2G": 21557, "S3G": 15693, "S4G": 35560, "STG": 11416}, "MECHANICAL ENGINEERING": {"1G": 23951, "2AG": 22218, "2BG": 32645, "3AG": 12975, "3BG": 33092, "GM": 12356, "GMK": 12822, "GMR": 31954, "S1G": 82080, "S2G": 47624, "S3G": 48980, "S4G": null, "STG": 37855}, "MEDICAL ELECTRONICS ENGINEERING": {"1G": 46312, "2AG": 42170, "2BG": 33470, "3AG": 65249, "3BG": 24552, "GM": 24862, "GMK": null, "GMR": 33910, "S1G": 74248, "S2G": 42697, "S3G": 99038, "S4G": null, "STG": null}}, "RVCE": {"AERO SPACE ENGINEERING": {"1G": 7994, "1K": 61957, "1R": null, "2AG": 4871, "2AK": null, "2AR": null, "2BG": 4572, "2BK": null, "2BR": null, "3AG": 2272, "3AK": null, "3AR": null, "3BG": 3400, "3BK": null, "3BR": null, "GM": 1816, "GMK": null, "GMR": 5692, "S1G": 5108, "S1K": null, "S1R": null, "S2G": 6493, "S2K": null, "S2R": 16461, "S3G": 15230, "S3R": null, "S4G": null, "STG": null, "STR": null}, "BIO-TECHNOLOGY": {"1G": 8551, "1K": null, "1R": null, "2AG": 12350, "2AK": null, "2AR": null, "2BG": 15167, "2BK": null, "2BR": null, "3AG": 57506, "3AK": null, "3AR": null, "3BG": 9209, "3BK": null, "3BR": null, "GM": 6010, "GMK": null, "GMR": 8283, "S1G": 27025, "S1K": null, "S1R": null, "S2G": 11899, "S2K": null, "S2R": 11949, "S3G": null, "S3R": null, "S4G": null, "STG": null, "STR": 50683}, "CHEMICAL ENGINEERING": {"1G": null, "1K": null, "1R": null, "2AG": 17292, "2AK": null, "2AR": null, "2BG": 13874, "2BK": null, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": null, "3BK": null, "3BR": null, "GM": 8274, "GMK": 52929, "GMR": 17301, "S1G": 97208, "S1K": null, "S1R": null, "S2G": 41191, "S2K": null, "S2R": null, "S3G": null, "S3R": null, "S4G": null, "STG": null, "STR": 126613}, "CIVIL ENGINEERING": {"1G": 18462, "1K": null, "1R": 36434, "2AG": 11304, "2AK": null, "2AR": null, "2BG": 19342, "2BK": null, "2BR": null, "3AG": 10474, "3AK": null, "3AR": null, "3BG": 12612, "3BK": null, "3BR": null, "GM": 8030, "GMK": 11673, "GMR": 23050, "S1G": 15458, "S1K": null, "S1R": null, "S2G": 27863, "S2K": null, "S2R": null, "S3G": 28193, "S3R": null, "S4G": null, "STG": null, "STR": null}, "COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)": {"1G": 1161, "1K": null, "1R": 3063, "2AG": 1436, "2AK": 3770, "2AR": 2770, "2BG": 2236, "2BK": null, "2BR": null, "3AG": 808, "3AK": null, "3AR": null, "3BG": 840, "3BK": 1414, "3BR": null, "GM": 534, "GMK": 1321, "GMR": 1318, "S1G": 6638, "S1K": null, "S1R": 15029, "S2G": 6148, "S2K": null, "S2R": 15638, "S3G": 15340, "S3R": null, "S4G": null, "STG": 3063, "STR": null}, "COMPUTER SCIENCE AND ENGINEERING": {"1G": 837, "1K": null, "1R": 1792, "2AG": 1272, "2AK": 1738, "2AR": 1459, "2BG": 2174, "2BK": null, "2BR": 2293, "3AG": 465, "3AK": null, "3AR": 1015, "3BG": 598, "3BK": 2031, "3BR": 1098, "GM": 370, "GMK": 1294, "GMR": 770, "S1G": 3018, "S1K": null, "S1R": 8542, "S2G": 5397, "S2K": 6377, "S2R": 6345, "S3G": 4192, "S3R": 6321, "S4G": 4320, "STG": 2404, "STR": 4594}, "COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)": {"1G": 1792, "1K": null, "1R": 2840, "2AG": 1947, "2AK": null, "2AR": null, "2BG": 2446, "2BK": null, "2BR": null, "3AG": 1462, "3AK": 4340, "3AR": 2306, "3BG": 1054, "3BK": null, "3BR": null, "GM": 626, "GMK": null, "GMR": 1952, "S1G": 10942, "S1K": null, "S1R": null, "S2G": 5088, "S2K": null, "S2R": null, "S3G": 9380, "S3R": null, "S4G": null, "STG": null, "STR": null}, "COMPUTER SCIENCE AND ENGINEERING(DATA SCIENCE)": {"1G": 2347, "1K": null, "1R": null, "2AG": 1767, "2AK": null, "2AR": 3099, "2BG": 2684, "2BK": 7437, "2BR": null, "3AG": 1126, "3AK": null, "3AR": null, "3BG": 1231, "3BK": null, "3BR": null, "GM": 623, "GMK": null, "GMR": 2058, "S1G": 8912, "S1K": null, "S1R": null, "S2G": 7198, "S2K": null, "S2R": null, "S3G": 9394, "S3R": 14661, "S4G": null, "STG": null, "STR": null}, "ELECTRICAL & ELECTRONICS ENGINEERING": {"1G": 4786, "1K": null, "1R": null, "2AG": 5793, "2AK": null, "2AR": null, "2BG": 46105, "2BK": null, "2BR": null, "3AG": 1948, "3AK": null, "3AR": null, "3BG": 3054, "3BK": null, "3BR": null, "GM": 1410, "GMK": null, "GMR": 6398, "S1G": 27908, "S1K": null, "S1R": null, "S2G": 28084, "S2K": null, "S2R": null, "S3G": 18980, "S3R": null, "S4G": null, "STG": 34827, "STR": null}, "ELECTRONICS AND COMMUNICATION ENGG": {"1G": 2863, "1K": null, "1R": 4539, "2AG": 2028, "2AK": 6189, "2AR": 3778, "2BG": 3920, "2BK": null, "2BR": 6455, "3AG": 1397, "3AK": null, "3AR": null, "3BG": 1510, "3BK": 3387, "3BR": null, "GM": 708, "GMK": 4295, "GMR": 2367, "S1G": 10322, "S1K": 70034, "S1R": 20435, "S2G": 11149, "S2K": null, "S2R": 15413, "S3G": 8589, "S3R": 25917, "S4G": null, "STG": 4498, "STR": null}, "ELECTRONICS AND TELECOMMUNICATION ENGINEERING": {"1G": 4808, "1K": null, "1R": 7062, "2AG": 3375, "2AK": 3425, "2AR": 18188, "2BG": 3585, "2BK": 2192, "2BR": null, "3AG": 2142, "3AK": null, "3AR": null, "3BG": 1834, "3BK": 1884, "3BR": null, "GM": 792, "GMK": 842, "GMR": 3466, "S1G": 18077, "S1K": 18127, "S1R": null, "S2G": 12028, "S2K": 12078, "S2R": null, "S3G": null, "S3R": 43210, "S4G": null, "STG": null, "STR": 7062}, "INDUSTRIAL ENGINEERING & MANAGEMENT": {"1G": null, "1K": null, "1R": null, "2AG": 22764, "2AK": 31820, "2AR": 26731, "2BG": 28112, "2BK": null, "2BR": null, "3AG": 17940, "3AK": null, "3AR": null, "3BG": 18052, "3BK": null, "3BR": null, "GM": 13020, "GMK": 30346, "GMR": 32302, "S1G": 105634, "S1K": null, "S1R": 291329, "S2G": 76845, "S2K": null, "S2R": null, "S3G": 41091, "S3R": null, "S4G": null, "STG": 41212, "STR": null}, "MECHANICAL ENGINEERING": {"1G": 10906, "1K": null, "1R": null, "2AG": 8337, "2AK": null, "2AR": 18672, "2BG": 16084, "2BK": null, "2BR": null, "3AG": 5610, "3AK": null, "3AR": null, "3BG": 7043, "3BK": 18340, "3BR": null, "GM": 4301, "GMK": 22922, "GMR": 18460, "S1G": 56520, "S1K": null, "S1R": null, "S2G": 31426, "S2K": 145263, "S2R": 107122, "S3G": 24726, "S3R": null, "S4G": null, "STG": 18315, "STR": null}}, "PES": {"B.TECH IN BIO-TECHNOLOGY": {"1G": null, "1K": null, "1R": null, "2AG": null, "2AK": null, "2AR": null, "2BG": null, "2BK": null, "2BR": null, "3AG": 8911, "3AK": null, "3AR": null, "3BG": 5610, "3BK": null, "3BR": null, "GM": 9115, "GMK": null, "GMR": 27694, "S1G": 54914, "S1K": null, "S1R": 106618, "S2G": 35050, "S2K": null, "S2R": null, "S3G": 36361, "S3R": null, "S4G": 121676, "STG": 42057, "STK": null, "STR": null}, "B.TECH IN COMPUTER SCIENCE & ENGINEERING (AI & ML)": {"1G": 4174, "1K": 9892, "1R": 7736, "2AG": 4453, "2AK": 6768, "2AR": 5411, "2BG": 5397, "2BK": null, "2BR": 6832, "3AG": 2020, "3AK": null, "3AR": 3827, "3BG": 2233, "3BK": 6678, "3BR": 3753, "GM": 1624, "GMK": 6613, "GMR": 3745, "S1G": 27374, "S1K": null, "S1R": 30589, "S2G": 18241, "S2K": 24405, "S2R": 27536, "S3G": 13042, "S3R": 18432, "S4G": 27525, "STG": 11773, "STK": null, "STR": 11938}, "B.TECH IN COMPUTER SCIENCE AND ENGINEERING": {"1G": 3264, "1K": null, "1R": 4191, "2AG": 3266, "2AK": 7236, "2AR": 4436, "2BG": 5420, "2BK": 13263, "2BR": 8689, "3AG": 1887, "3AK": 8351, "3AR": 3547, "3BG": 1874, "3BK": 7638, "3BR": 3305, "GM": 1164, "GMK": 5985, "GMR": 2936, "S1G": 23604, "S1K": 41259, "S1R": 41805, "S2G": 17412, "S2K": 42134, "S2R": 22047, "S3G": 10696, "S3R": 20370, "S4G": 17927, "STG": 9742, "STK": null, "STR": 11443}, "B.TECH IN ELECTRICAL & ELECTRONICS ENGINEERING": {"1G": null, "1K": null, "1R": null, "2AG": 14750, "2AK": null, "2AR": null, "2BG": 18874, "2BK": null, "2BR": null, "3AG": null, "3AK": null, "3AR": null, "3BG": 16728, "3BK": null, "3BR": null, "GM": 6282, "GMK": 39426, "GMR": 17620, "S1G": 50376, "S1K": null, "S1R": null, "S2G": 40856, "S2K": null, "S2R": null, "S3G": 43874, "S3R": null, "S4G": null, "STG": null, "STK": null, "STR": 101281}, "B.TECH IN ELECTRONICS & COMMUNICATION ENGINEERING": {"1G": 7110, "1K": null, "1R": 11289, "2AG": 5560, "2AK": 14333, "2AR": 11452, "2BG": 9781, "2BK": null, "2BR": 10408, "3AG": 2234, "3AK": null, "3AR": 6805, "3BG": 3805, "3BK": null, "3BR": 6662, "GM": 2006, "GMK": 7171, "GMR": 6128, "S1G": 28138, "S1K": 77286, "S1R": 36658, "S2G": 20687, "S2K": null, "S2R": 26124, "S3G": 21628, "S3R": 27214, "S4G": 200333, "STG": 12202, "STK": 28643, "STR": null}, "B.TECH IN MECHANICAL ENGINEERING": {"1G": 20260, "1K": null, "1R": null, "2AG": 14421, "2AK": null, "2AR": 35431, "2BG": 17139, "2BK": null, "2BR": null, "3AG": 10394, "3AK": null, "3AR": 31674, "3BG": 13488, "3BK": null, "3BR": null, "GM": 8724, "GMK": null, "GMR": 20826, "S1G": 79089, "S1K": null, "S1R": null, "S2G": 44369, "S2K": null, "S2R": null, "S3G": 190176, "S3R": null, "S4G": null, "STG": null, "STK": null, "STR": null}}, "BMSCE": {"ARTIFICIAL INTELLIGENCE AND DATA SCIENCE": {"GM": 4314, "GMK": 9700, "GMR": 7937, "1G": 9991, "2AG": 7386, "2BG": 8519, "3AG": 5238, "3BG": 5200, "SCG": 29632, "STG": 17447}, "ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING": {"GM": 4386, "GMK": 8793, "GMR": 7281, "1G": 10514, "2AG": 8242, "2BG": 11638, "3AG": 5292, "3BG": 5364, "SCG": 27199, "STG": 15890}, "BIO-TECHNOLOGY": {"GM": 11315, "GMK": 45588, "GMR": 19950, "1G": 21822, "2AG": 18970, "2BG": 22396, "3AG": 13899, "3BG": 22618, "SCG": 69623, "STG": null}, "CHEMICAL ENGINEERING": {"GM": 14422, "GMK": 44938, "GMR": 28890, "1G": 33271, "2AG": 24633, "2BG": 29781, "3AG": 15104, "3BG": 23084, "SCG": 60184, "STG": 216310}, "CIVIL ENGINEERING": {"GM": 30106, "GMK": 41284, "GMR": 37624, "1G": 38146, "2AG": 31503, "2BG": 31389, "3AG": 30475, "3BG": 30869, "SCG": 53574, "STG": null}, "COMPUTER SCIENCE AND BUSINESS SYSTEMS": {"GM": 5664, "GMK": 17247, "GMR": 9942, "1G": 11516, "2AG": 12433, "2BG": 18184, "3AG": 6475, "3BG": 6139, "SCG": 48058, "STG": 101436}, "CS & ENGG(IOT CYBER SECURITY & BLOCKCHAIN)": {"GM": 4516, "GMK": 14730, "GMR": 7340, "1G": 10964, "2AG": 9396, "2BG": 11654, "3AG": 5800, "3BG": 5836, "SCG": 38931, "STG": null}, "COMPUTER SCIENCE AND ENGINEERING": {"GM": 3326, "GMK": 9442, "GMR": 5992, "1G": 7885, "2AG": 6814, "2BG": 9616, "3AG": 4255, "3BG": 4556, "SCG": 30911, "STG": 14338}, "COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)": {"GM": 4062, "GMK": 9532, "GMR": 6894, "1G": 7964, "2AG": 7544, "2BG": 7097, "3AG": 4072, "3BG": 4936, "SCG": 33257, "STG": 16305}, "ELECTRONICS AND COMMUNICATION ENGG": {"GM": 3015, "GMK": 11285, "GMR": 7258, "1G": 7616, "2AG": 7752, "2BG": 11608, "3AG": 4694, "3BG": 4310, "SCG": 43114, "STG": 15020}, "MECHANICAL ENGINEERING": {"GM": 15717, "GMK": 60944, "GMR": 42048, "1G": 28124, "2AG": 25065, "2BG": 53090, "3AG": 39438, "3BG": 21057, "SCG": 105601, "STG": null}}};

const COLLEGE_META = {
  MSRIT: { full: "M S Ramaiah Institute of Technology", code: "E006" },
  RVCE: { full: "R. V. College of Engineering", code: "E005" },
  PES: { full: "PES University", code: "E009" },
  BMSCE: { full: "B.M.S. College of Engineering", code: "E048" },
};


const CATEGORY_LABELS = {
  "1G": "1G — Category 1 General", "1K": "1K — Cat 1 Kannada", "1R": "1R — Cat 1 Rural",
  "2AG": "2AG — Cat 2A General", "2AK": "2AK — Cat 2A Kannada", "2AR": "2AR — Cat 2A Rural",
  "2BG": "2BG — Cat 2B General", "2BK": "2BK — Cat 2B Kannada", "2BR": "2BR — Cat 2B Rural",
  "3AG": "3AG — Cat 3A General", "3AK": "3AK — Cat 3A Kannada", "3AR": "3AR — Cat 3A Rural",
  "3BG": "3BG — Cat 3B General", "3BK": "3BK — Cat 3B Kannada", "3BR": "3BR — Cat 3B Rural",
  GM: "GM — General Merit", GMK: "GMK — General Merit Kannada", GMR: "GMR — General Merit Rural",
  S1G: "S1G — Sports Cat1 Gen", S1K: "S1K — Sports Cat1 Kan", S1R: "S1R — Sports Cat1 Rural",
  S2G: "S2G — Sports Cat2 Gen", S2K: "S2K — Sports Cat2 Kan", S2R: "S2R — Sports Cat2 Rural",
  S3G: "S3G — Sports Cat3 Gen", S3R: "S3R — Sports Cat3 Rural",
  S4G: "S4G — Sports Cat4 Gen",
  STG: "STG — Sports Tie Gen", STK: "STK — Sports Tie Kan", STR: "STR — Sports Tie Rural",
  SCG: "SCG — College Quota Gen",
};

function verdictFor(margin) {
  if (margin >= 15) return { tier: "Very Strong Chance", key: "strong", prob: Math.min(99, 90 + (margin - 15) * 0.3) };
  if (margin >= 5) return { tier: "Realistic Chance", key: "realistic", prob: 70 + ((margin - 5) / 10) * 24 };
  if (margin >= -5) return { tier: "Borderline", key: "borderline", prob: 40 + ((margin + 5) / 10) * 20 };
  if (margin >= -20) return { tier: "Slim Chance", key: "slim", prob: 10 + ((margin + 20) / 15) * 25 };
  return { tier: "Not Possible", key: "impossible", prob: Math.max(0.5, 5 + margin / 10) };
}

const VERDICT_STYLE = {
  strong: { bg: "#eaf4ec", border: "#2d6a4f", text: "#1e4a37", accent: "#2d6a4f" },
  realistic: { bg: "#f1f6e4", border: "#74a12e", text: "#4d6b1f", accent: "#74a12e" },
  borderline: { bg: "#fbf1de", border: "#c99a2e", text: "#8a681f", accent: "#c99a2e" },
  slim: { bg: "#fbe9e0", border: "#d16b3f", text: "#973f24", accent: "#d16b3f" },
  impossible: { bg: "#f7e2df", border: "#b3402f", text: "#7a2a1e", accent: "#b3402f" },
};

// Inject the keyframe animations once (JSX has no <style jsx>, so we use a plain <style> tag)
const ANIMATION_CSS = `
@keyframes tfc-settleIn {
  0% { opacity: 0; transform: translateY(6px) scale(0.99); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes tfc-confidentPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(45,106,79,0.0); }
  50% { box-shadow: 0 0 0 6px rgba(45,106,79,0.08); }
}
@keyframes tfc-cautionGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(201,154,46,0.0); }
  50% { box-shadow: 0 0 0 5px rgba(201,154,46,0.10); }
}
@keyframes tfc-alertShift {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
@keyframes tfc-badgeIn {
  0% { opacity: 0; transform: scale(0.9); }
  60% { opacity: 1; transform: scale(1.03); }
  100% { opacity: 1; transform: scale(1); }
}
.tfc-card-strong { animation: tfc-settleIn 0.4s ease-out, tfc-confidentPulse 2.8s ease-in-out 0.4s 2; }
.tfc-card-realistic  { animation: tfc-settleIn 0.4s ease-out, tfc-confidentPulse 2.8s ease-in-out 0.4s 1; }
.tfc-card-borderline { animation: tfc-settleIn 0.4s ease-out, tfc-cautionGlow 2.2s ease-in-out 0.4s 2; }
.tfc-card-slim       { animation: tfc-settleIn 0.4s ease-out, tfc-alertShift 0.5s ease-in-out 0.4s 1; }
.tfc-card-impossible { animation: tfc-settleIn 0.4s ease-out, tfc-alertShift 0.4s ease-in-out 0.4s 2; }
.tfc-badge-anim { animation: tfc-badgeIn 0.5s ease-out 0.5s both; }
.tfc-gauge-fill { transition: width 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s; }
.tfc-gauge-marker { transition: left 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s; }
@keyframes tfc-numberFocus {
  0% { opacity: 0.45; transform: translateY(3px); }
  55% { opacity: 1; }
  100% { opacity: 1; transform: translateY(0); }
}
.tfc-number-anim {
  display: inline-block;
  min-width: 1ch;
  font-variant-numeric: tabular-nums;
  animation: tfc-numberFocus 0.85s ease-out both;
}


@keyframes tfc-atmosphereDrift {
  0% { transform: translate3d(-1.5%, -1%, 0) scale(1); }
  50% { transform: translate3d(1.5%, 1%, 0) scale(1.025); }
  100% { transform: translate3d(-0.5%, 1.5%, 0) scale(1.01); }
}
@keyframes tfc-atmosphereBreath {
  0%, 100% { opacity: 0.42; }
  50% { opacity: 0.62; }
}
.tfc-page {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #f7f4ea;
  transition: background-color 0.8s ease;
}
.tfc-page::before,
.tfc-page::after {
  content: "";
  position: absolute;
  inset: -18%;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.8s ease, background 0.8s ease;
}
.tfc-page::before {
  background:
    radial-gradient(circle at 14% 14%, var(--tfc-glow-a, transparent) 0, transparent 34%),
    radial-gradient(circle at 84% 28%, var(--tfc-glow-b, transparent) 0, transparent 31%),
    radial-gradient(circle at 52% 88%, var(--tfc-glow-c, transparent) 0, transparent 38%);
}
.tfc-page::after {
  inset: 0;
  background:
    linear-gradient(115deg, transparent 20%, var(--tfc-sheen, transparent) 48%, transparent 72%),
    radial-gradient(circle at 50% 42%, transparent 0, rgba(247,244,234,0.26) 72%);
}
.tfc-page.tfc-has-result::before {
  opacity: 1;
  animation: tfc-atmosphereDrift 16s ease-in-out infinite alternate;
}
.tfc-page.tfc-has-result::after {
  opacity: 1;
  animation: tfc-atmosphereBreath 7s ease-in-out infinite;
}
.tfc-page-inner {
  position: relative;
  z-index: 1;
}
.tfc-bg-strong,
.tfc-bg-realistic {
  --tfc-glow-a: rgba(45,106,79,0.16);
  --tfc-glow-b: rgba(116,161,46,0.12);
  --tfc-glow-c: rgba(57,128,86,0.09);
  --tfc-sheen: rgba(105,154,103,0.07);
}
.tfc-bg-borderline {
  --tfc-glow-a: rgba(201,154,46,0.17);
  --tfc-glow-b: rgba(224,178,73,0.10);
  --tfc-glow-c: rgba(180,132,36,0.08);
  --tfc-sheen: rgba(214,166,56,0.07);
}
.tfc-bg-slim {
  --tfc-glow-a: rgba(209,107,63,0.17);
  --tfc-glow-b: rgba(222,139,58,0.11);
  --tfc-glow-c: rgba(190,86,46,0.08);
  --tfc-sheen: rgba(211,115,61,0.07);
}
.tfc-bg-impossible {
  --tfc-glow-a: rgba(179,64,47,0.16);
  --tfc-glow-b: rgba(209,107,63,0.10);
  --tfc-glow-c: rgba(153,50,43,0.08);
  --tfc-sheen: rgba(181,70,53,0.065);
}
.tfc-bg-neutral {
  --tfc-glow-a: rgba(138,132,114,0.08);
  --tfc-glow-b: rgba(160,151,128,0.06);
  --tfc-glow-c: rgba(120,116,104,0.05);
  --tfc-sheen: rgba(140,133,115,0.045);
}
@media (prefers-reduced-motion: reduce) {
  .tfc-card-strong, .tfc-card-realistic, .tfc-card-borderline, .tfc-card-slim, .tfc-card-impossible,
  .tfc-badge-anim, .tfc-number-anim { animation: none !important; }
  .tfc-gauge-fill, .tfc-gauge-marker { transition: none !important; }
  .tfc-page.tfc-has-result::before, .tfc-page.tfc-has-result::after { animation: none !important; }
}
`;

const VERDICT_CLASS = {
  strong: "tfc-card-strong",
  realistic: "tfc-card-realistic",
  borderline: "tfc-card-borderline",
  slim: "tfc-card-slim",
  impossible: "tfc-card-impossible",
};

function fmt(n) {
  if (n === null || n === undefined) return "—";
  return n.toLocaleString("en-IN");
}

function AnimatedNumber({ value, duration = 850 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (value === null || value === undefined) return;

    const reduceMotion = typeof window !== "undefined"
      && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    setDisplayValue(0);
    const startedAt = performance.now();
    let frameId;

    const tick = now => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return <span className="tfc-number-anim">{fmt(displayValue)}</span>;
}

function ResultCard({ college, branch, category, rank }) {
  const cutoff = RAW_DATA[college]?.[branch]?.[category];
  if (cutoff === undefined) return null;

  if (cutoff === null) {
    return (
      <div style={{
        border: "1px solid #d8d2c2", borderLeft: "5px solid #9a9284", background: "#f4f1ea",
        borderRadius: 4, padding: "18px 20px", fontFamily: "'IBM Plex Mono', monospace",
      }}>
        <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: 15, color: "#5b5648", marginBottom: 4 }}>
          {COLLEGE_META[college].full} · {branch}
        </div>
        <div style={{ fontSize: 13, color: "#7a745f" }}>
          No Round 3 allotment recorded for <b>{category}</b> in this branch. This category may not have seats here, or none were filled this round.
        </div>
      </div>
    );
  }

  const margin = ((cutoff - rank) / cutoff) * 100;
  const v = verdictFor(margin);
  const s = VERDICT_STYLE[v.key];
  const prob = Math.max(0.5, Math.min(99, v.prob)).toFixed(0);

  const clamped = Math.max(-40, Math.min(40, margin));
  const gaugePct = ((clamped + 40) / 80) * 100;

  return (
    <div className={VERDICT_CLASS[v.key]} style={{
      border: `1px solid ${s.border}55`, borderLeft: `6px solid ${s.border}`, background: s.bg,
      borderRadius: 4, padding: "22px 24px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: 16, fontWeight: 600, color: "#2a2620" }}>
          {COLLEGE_META[college].full}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, color: "#8a8472", textTransform: "uppercase" }}>
          {COLLEGE_META[college].code}
        </div>
      </div>
      <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontSize: 13, color: "#5b5648", marginTop: 2, marginBottom: 16 }}>
        {branch}
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 14 }}>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>Your Rank</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: "#2a2620" }}><AnimatedNumber value={rank} /></div>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, color: "#b3ab94", paddingBottom: 4 }}>vs</div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>R3 Cutoff ({category})</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: "#2a2620" }}><AnimatedNumber value={cutoff} /></div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>Margin</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 600, color: s.accent }}>
            {margin >= 0 ? "+" : ""}{margin.toFixed(1)}%
          </div>
        </div>
      </div>

      <div style={{ position: "relative", height: 8, background: "#e4ddc9", borderRadius: 4, marginBottom: 6 }}>
        <div style={{ position: "absolute", left: "50%", top: -3, bottom: -3, width: 2, background: "#2a2620aa" }} />
        <div className="tfc-gauge-fill" style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: `${gaugePct}%`,
          background: s.accent, borderRadius: 4,
        }} />
        <div className="tfc-gauge-marker" style={{
          position: "absolute", left: `calc(${gaugePct}% - 5px)`, top: -4, width: 12, height: 16,
          background: s.accent, borderRadius: 2, boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, color: "#9a9484", marginBottom: 18 }}>
        <span>WORSE THAN CUTOFF</span>
        <span>CUTOFF LINE</span>
        <span>BETTER THAN CUTOFF</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div className="tfc-badge-anim" style={{
          display: "inline-block", padding: "6px 14px", borderRadius: 3, background: s.accent,
          color: "#fff", fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 700, fontSize: 15,
        }}>
          {v.tier}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: s.text }}>
          Estimated probability: <b>{prob}%</b>
        </div>
      </div>
    </div>
  );
}

const selStyle = {
  width: "100%", padding: "9px 10px", border: "1px solid #ccc4ac", borderRadius: 4,
  background: "#fdfcf8", fontSize: 13, color: "#2a2620", boxSizing: "border-box",
};

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1, color: "#8a8472", textTransform: "uppercase", marginBottom: 6 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

export default function TheFinalCall() {
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [category, setCategory] = useState("");
  const [rankInput, setRankInput] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const checkRunRef = useRef(0);

  const branches = useMemo(
    () => (college ? Object.keys(RAW_DATA[college] || {}).sort() : []),
    [college]
  );

  const categories = useMemo(() => {
    if (!college || !branch) return [];
    const b = RAW_DATA[college]?.[branch];
    return b ? Object.keys(b) : [];
  }, [college, branch]);

  const rank = parseInt(rankInput, 10);
  const rankValid = !isNaN(rank) && rank > 0;
  const formReady = Boolean(college && branch && category && rankValid);

  const clearResult = () => setSubmitted(null);

  const handleCollegeChange = e => {
    setCollege(e.target.value);
    setBranch("");
    setCategory("");
    clearResult();
  };

  const handleBranchChange = e => {
    setBranch(e.target.value);
    setCategory("");
    clearResult();
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
    clearResult();
  };

  const handleRankChange = e => {
    setRankInput(e.target.value);
    clearResult();
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (!formReady) return;

    checkRunRef.current += 1;
    setSubmitted({
      college,
      branch,
      category,
      rank,
      runId: checkRunRef.current,
    });
  };

  const suggestions = useMemo(() => {
    if (!submitted) return [];

    const { college: resultCollege, branch: resultBranch, category: resultCategory, rank: resultRank } = submitted;
    const resultBranches = Object.keys(RAW_DATA[resultCollege] || {}).sort();
    const cur = RAW_DATA[resultCollege]?.[resultBranch]?.[resultCategory];
    const curVerdict = cur != null
      ? verdictFor(((cur - resultRank) / cur) * 100).key
      : null;

    if (curVerdict !== "impossible" && curVerdict !== "slim" && curVerdict !== null) return [];

    const opts = [];
    for (const b of resultBranches) {
      if (b === resultBranch) continue;
      const c = RAW_DATA[resultCollege][b][resultCategory];
      if (c == null) continue;

      const m = ((c - resultRank) / c) * 100;
      const vt = verdictFor(m);
      if (vt.key === "strong" || vt.key === "realistic") {
        opts.push({ branch: b, cutoff: c, tier: vt.tier });
      }
    }
    return opts.slice(0, 3);
  }, [submitted]);

  const resultKey = submitted
    ? `${submitted.college}|${submitted.branch}|${submitted.category}|${submitted.rank}|${submitted.runId}`
    : "empty";

  const resultTheme = useMemo(() => {
    if (!submitted) return "neutral";

    const cutoff = RAW_DATA[submitted.college]?.[submitted.branch]?.[submitted.category];
    if (cutoff === null || cutoff === undefined) return "neutral";

    const margin = ((cutoff - submitted.rank) / cutoff) * 100;
    return verdictFor(margin).key;
  }, [submitted]);

  return (
    <div
      className={`tfc-page ${submitted ? `tfc-has-result tfc-bg-${resultTheme}` : ""}`}
      style={{
        fontFamily: "'Source Serif Pro', Georgia, serif", minHeight: "100vh",
        padding: "32px 16px", color: "#2a2620",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+Pro:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        select, input, button { font-family: 'IBM Plex Mono', monospace; }
        select:focus, input:focus, button:focus-visible { outline: 2px solid #1a2332; outline-offset: 2px; }
        select:disabled { background: #f2efe7; color: #aaa392; cursor: not-allowed; }
        ${ANIMATION_CSS}
      `}</style>

      <div className="tfc-page-inner" style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ borderBottom: "3px double #1a2332", paddingBottom: 16, marginBottom: 28 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 2, color: "#8a8472", textTransform: "uppercase", marginBottom: 6 }}>
            KCET 2026 · Round 3 Predicted Cutoffs
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0, letterSpacing: -0.3 }}>The Final Call</h1>
          <div style={{ fontSize: 14, color: "#5b5648", marginTop: 4, fontStyle: "italic" }}>
            Choose your details, then check your rank against Round 3 predicted cutoffs — RVCE, MSRIT, PES, BMSCE
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{
          background: "#fff", border: "1px solid #ddd6c4", borderRadius: 6, padding: "22px 24px", marginBottom: 24,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            <Field label="College">
              <select value={college} onChange={handleCollegeChange} style={selStyle}>
                <option value="">Select college</option>
                {Object.keys(RAW_DATA).map(c => (
                  <option key={c} value={c}>{c} — {COLLEGE_META[c].full}</option>
                ))}
              </select>
            </Field>

            <Field label="Branch">
              <select value={branch} onChange={handleBranchChange} style={selStyle} disabled={!college}>
                <option value="">{college ? "Select branch" : "Select college first"}</option>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>

            <Field label="Category">
              <select value={category} onChange={handleCategoryChange} style={selStyle} disabled={!branch}>
                <option value="">{branch ? "Select category" : "Select branch first"}</option>
                {categories.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c] || c}</option>)}
              </select>
            </Field>

            <Field label="Your KCET Rank">
              <input
                type="number"
                min="1"
                inputMode="numeric"
                value={rankInput}
                onChange={handleRankChange}
                placeholder="Enter your rank"
                style={selStyle}
              />
            </Field>
          </div>

          <div style={{
            display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 14,
            flexWrap: "wrap", marginTop: 18,
          }}>
            <button
              type="submit"
              disabled={!formReady}
              style={{
                border: "1px solid #1a2332", borderRadius: 4, padding: "10px 18px",
                background: formReady ? "#1a2332" : "#d8d2c2",
                color: formReady ? "#fff" : "#8a8472",
                fontSize: 12, fontWeight: 600, letterSpacing: 0.8, textTransform: "uppercase",
                cursor: formReady ? "pointer" : "not-allowed",
                transition: "transform 0.15s ease, background 0.15s ease",
              }}
            >
              Check Result
            </button>
          </div>
        </form>

        {!submitted ? (
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#8a8472",
            textAlign: "center", padding: "36px 20px", border: "1px dashed #d8d2c2", borderRadius: 6,
            background: "#fbfaf5",
          }}>
            {formReady
              ? "Your selections are ready — press Check Result to see your prediction."
              : "Select a college, branch, category and enter your KCET rank to begin."}
          </div>
        ) : (
          <div key={resultKey}>
            <ResultCard
              college={submitted.college}
              branch={submitted.branch}
              category={submitted.category}
              rank={submitted.rank}
            />
          </div>
        )}

        {submitted && suggestions.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: 1, color: "#8a8472", textTransform: "uppercase", marginBottom: 10 }}>
              You may also consider — same college, better odds
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {suggestions.map(s => (
                <div key={s.branch} style={{
                  background: "#eaf4ec", border: "1px solid #2d6a4f33", borderLeft: "4px solid #2d6a4f",
                  borderRadius: 4, padding: "12px 14px", flex: "1 1 220px",
                }}>
                  <div style={{ fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 600, fontSize: 13 }}>{s.branch}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#4d6b1f", marginTop: 4 }}>
                    Cutoff {fmt(s.cutoff)} · {s.tier}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{
          marginTop: 40, paddingTop: 16, borderTop: "1px solid #ddd6c4",
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: "#9a9484", lineHeight: 1.6,
        }}>
          Cutoff values are the midpoint of predicted Round 3 ranges built from the KEA vacant-seat matrix. Where a category had no value in the latest release, the previous prediction plus a small margin was used instead. Verdict bands are margin-based from a single snapshot, not multi-round trend data — treat probabilities as directional, not exact. "—" means no Round 3 data exists for that category/branch at all.
        </div>
      </div>
    </div>
  );
}
