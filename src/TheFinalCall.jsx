import React, { useState, useMemo, useEffect, useRef } from "react";

const RAW_DATA = {"MSRIT":{"AERO SPACE ENGINEERING":{"1G":8230,"2AG":9551,"2BG":11223,"3BG":5730,"GM":5764,"GMK":9107,"GMR":7406},"ARTIFICIAL INTELLIGENCE AND DATA SCIENCE":{"2AG":6490,"2BG":6968,"3AG":3498,"3BG":3830,"GM":2860,"STG":15613},"ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING":{"1G":2736,"2AG":6427,"2BG":5460,"3AG":2915,"3BG":2882,"GM":2340,"GMR":5387,"STG":8487},"BIO-TECHNOLOGY":{"1G":19109,"2AG":16491,"2BG":13747,"3AG":13002,"3BG":13484,"GM":10719,"GMR":14840},"CHEMICAL ENGINEERING":{"1G":45665,"2AG":33840,"3BG":22540,"GM":15543,"GMR":26264},"CIVIL ENGINEERING":{"1G":34344,"2AG":45234,"2BG":42122,"3BG":23807,"GM":24271,"GMR":39964},"COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)":{"1G":2451,"2AG":5504,"3AG":2453,"3BG":3059,"GM":2094,"GMK":6291,"GMR":4368,"STG":12310},"COMPUTER SCIENCE AND ENGINEERING":{"1G":2127,"2AG":4481,"2BG":5372,"3AG":2160,"3BG":2197,"GM":1693,"GMK":6351,"GMR":3729,"STG":9382},"COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)":{"1G":3696,"2AG":6713,"2BG":10533,"3AG":3782,"3BG":3627,"GM":2757,"GMR":4214,"STG":8826},"ELECTRICAL & ELECTRONICS ENGINEERING":{"2AG":13236,"2BG":12888,"3BG":9703,"GM":5593},"ELECTRONICS AND COMMUNICATION ENGG":{"1G":4416,"2AG":5579,"2BG":5186,"3AG":3989,"3BG":3692,"GM":2543,"GMK":10373,"GMR":5962,"STG":17438},"ELECTRONICS AND INSTRUMENTATION ENGINEERING":{"1G":19200,"2AG":16969,"3AG":11426,"3BG":13162,"GM":7074},"ELECTRONICS AND TELECOMMUNICATION ENGINEERING":{"2AG":9871,"3BG":5902,"GM":5023,"GMR":12364,"STG":19949},"INDUSTRIAL ENGINEERING & MANAGEMENT":{"2AG":42720,"2BG":29712,"3AG":30784,"3BG":27445,"GM":23858,"GMR":38157},"INFORMATION SCIENCE AND ENGINEERING":{"1G":5985,"2AG":6133,"2BG":8663,"3AG":3767,"3BG":4461,"GM":3367,"GMK":6121,"GMR":6244,"STG":13648},"MECHANICAL ENGINEERING":{"2AG":23517,"3AG":12998,"3BG":13497,"GM":12786,"GMK":31867,"STG":33189},"MEDICAL ELECTRONICS ENGINEERING":{"1G":42504,"2AG":37534,"2BG":34949,"3BG":30542,"GM":23066,"GMK":33101,"GMR":46285}},"RVCE":{"AERO SPACE ENGINEERING":{"1G":10293,"2AR":10193,"2BG":8629,"3AG":4842,"3BG":3044,"GM":1827},"BIO-TECHNOLOGY":{"3BG":11506,"GM":6769,"GMR":8233},"CHEMICAL ENGINEERING":{"GM":7186,"GMR":11860,"STG":55275},"CIVIL ENGINEERING":{"1G":30477,"3BG":12346,"GM":9383,"GMR":30434},"COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)":{"1G":999,"2AG":1407,"2AK":3297,"2AR":3031,"2BG":1992,"3AG":772,"3BG":699,"3BR":1223,"GM":477,"GMK":1106,"GMR":1138,"STG":3363},"COMPUTER SCIENCE AND ENGINEERING":{"1G":700,"1R":1603,"2AG":1234,"2AR":1491,"2BG":1975,"3AG":585,"3AR":846,"3BG":497,"3BK":1714,"3BR":929,"GM":322,"GMK":1086,"GMR":739,"STG":2534,"STR":4180},"COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)":{"1G":1460,"1R":3001,"2AG":1552,"3AG":1211,"3BG":841,"GM":562,"GMR":1593},"COMPUTER SCIENCE AND ENGINEERING(DATA SCIENCE)":{"1G":1820,"2AG":1558,"2BK":6013,"3AG":867,"3BG":936,"GM":527,"GMR":1591},"ELECTRICAL & ELECTRONICS ENGINEERING":{"1G":4501,"2AG":4770,"2BR":27117,"3AG":1413,"3BG":2155,"GM":1120,"GMR":4024},"ELECTRONICS AND COMMUNICATION ENGG":{"1G":2383,"1R":4011,"2AG":1951,"2AK":5320,"2BG":3279,"2BR":5625,"3BG":1612,"3BR":2949,"GM":672,"GMK":3679,"GMR":1968,"STG":4851},"ELECTRONICS AND TELECOMMUNICATION ENGINEERING":{"1G":6246,"2AG":3816,"2AR":3488,"3BG":1784,"GM":820,"GMR":3416,"STG":6962},"INDUSTRIAL ENGINEERING & MANAGEMENT":{"2AG":12242,"2AR":32020,"2BG":19563,"3AG":12889,"3BG":15051,"GM":10469,"GMR":22484,"STG":30200},"MECHANICAL ENGINEERING":{"1G":12356,"2AG":8526,"2BG":14091,"3AG":4825,"3BG":7790,"3BR":16826,"GM":4365,"GMK":21085,"GMR":13442,"STG":21557}},"PES":{"B.TECH IN BIO-TECHNOLOGY":{"1G":30720,"2AG":17848,"3AG":11850,"3BG":15113,"GM":8751,"GMR":28871,"STG":36784},"B.TECH IN COMPUTER SCIENCE & ENGINEERING (AI & ML)":{"1G":3530,"1R":6464,"2AG":4225,"2AK":6026,"2AR":4916,"2BG":4843,"3AR":3452,"3BG":1977,"3BK":5705,"3BR":3311,"GM":1524,"GMK":5516,"GMR":3476,"STG":10244,"STR":11741},"B.TECH IN COMPUTER SCIENCE AND ENGINEERING":{"1G":2719,"1R":3532,"2AG":3122,"2AK":6511,"2AR":4563,"2BG":4822,"2BK":13374,"3AG":1813,"3AR":3211,"3BG":1783,"3BR":2923,"GM":1081,"GMK":5413,"GMR":2708,"STG":10295,"STR":9829},"B.TECH IN ELECTRICAL & ELECTRONICS ENGINEERING":{"2AG":8387,"3BG":9863,"GMR":16575},"B.TECH IN ELECTRONICS & COMMUNICATION ENGINEERING":{"1G":6741,"1R":9983,"2AG":6578,"2AR":12238,"2BG":10492,"2BR":10465,"3AG":2235,"3AR":6635,"3BG":3675,"3BR":6452,"GM":1988,"GMK":6359,"GMR":6057,"STG":12972},"B.TECH IN MECHANICAL ENGINEERING":{"2AG":15498,"3BG":10174,"GM":9327,"GMR":18584}},"BMSCE":{"ARTIFICIAL INTELLIGENCE AND DATA SCIENCE":{"GM":4010,"GMK":7899,"GMR":7185,"1G":8294,"2AG":7515,"3AG":5154,"3BG":4818,"STG":19209},"ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING":{"GM":4227,"GMK":7318,"1G":7540,"2AG":8260,"2BG":7129,"3AG":5269,"3BG":4990,"STG":16232},"BIO-TECHNOLOGY":{"GM":11537,"GMR":22007,"2AG":19791,"2BG":21685,"3AG":14284},"CHEMICAL ENGINEERING":{"GM":13958,"GMK":39526,"GMR":28060,"1G":37177,"2AG":33933,"3AG":21812},"CIVIL ENGINEERING":{"GM":32837,"GMR":39622,"1G":39069,"2AG":34596,"2BG":31609,"3BG":32635},"COMPUTER SCIENCE AND BUSINESS SYSTEMS":{"GM":4795,"GMK":12178,"GMR":7847,"1G":8965,"2AG":10110,"2BG":11184,"3AG":5397,"3BG":4970},"CS & ENGG(IOT CYBER SECURITY & BLOCKCHAIN)":{"GM":3869,"GMR":6169,"1G":8374,"2AG":8587,"2BG":8912,"3AG":5063,"3BG":5325},"COMPUTER SCIENCE AND ENGINEERING":{"GM":3293,"GMK":8344,"GMR":6284,"1G":7796,"2AG":6944,"2BG":8505,"3AG":4570,"3BG":4747,"STG":15686},"COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)":{"GM":3917,"GMK":7953,"GMR":6545,"1G":6839,"2AG":7820,"2BG":6204,"3AG":4134,"3BG":4639,"STG":14531},"ELECTRONICS AND COMMUNICATION ENGG":{"GM":3076,"GMK":10439,"GMR":6411,"1G":8303,"2AG":8266,"2BG":10469,"3AG":4981,"3BG":4668,"STG":14428},"MECHANICAL ENGINEERING":{"GM":13489,"GMK":50412,"2AG":19690,"2BG":27301,"3BG":15886}}};

const PREDICTION_META = {"MSRIT":{"AERO SPACE ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7924,"high":10826,"r2_2026":8086,"modelP50":8230,"historicalReference":8086,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":0,"vacancyTotal2026":10},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8722,"high":12563,"r2_2026":8900,"modelP50":9551,"historicalReference":9314,"modelHistoryDisagreementPct":2.5,"vacancyExact2026":0,"vacancyTotal2026":10},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10882,"high":14763,"r2_2026":11104,"modelP50":11223,"historicalReference":11104,"modelHistoryDisagreementPct":1.1,"vacancyExact2026":0,"vacancyTotal2026":10},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5208,"high":7537,"r2_2026":5307,"modelP50":5730,"historicalReference":5307,"modelHistoryDisagreementPct":7.4,"vacancyExact2026":0,"vacancyTotal2026":10},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5238,"high":7582,"r2_2026":5092,"modelP50":5764,"historicalReference":5193,"modelHistoryDisagreementPct":9.9,"vacancyExact2026":5,"vacancyTotal2026":10},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8807,"high":11979,"r2_2026":8987,"modelP50":9107,"historicalReference":8987,"modelHistoryDisagreementPct":1.3,"vacancyExact2026":0,"vacancyTotal2026":10},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6758,"high":9742,"r2_2026":6896,"modelP50":7406,"historicalReference":6896,"modelHistoryDisagreementPct":6.9,"vacancyExact2026":0,"vacancyTotal2026":10}},"ARTIFICIAL INTELLIGENCE AND DATA SCIENCE":{"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5609,"high":10762,"r2_2026":5574,"modelP50":6490,"historicalReference":7702,"modelHistoryDisagreementPct":18.7,"vacancyExact2026":0,"vacancyTotal2026":12},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6022,"high":11555,"r2_2026":5509,"modelP50":6968,"historicalReference":5509,"modelHistoryDisagreementPct":20.9,"vacancyExact2026":1,"vacancyTotal2026":12},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3180,"high":4602,"r2_2026":2825,"modelP50":3498,"historicalReference":3295,"modelHistoryDisagreementPct":5.8,"vacancyExact2026":1,"vacancyTotal2026":12},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3481,"high":5038,"r2_2026":3459,"modelP50":3830,"historicalReference":4291,"modelHistoryDisagreementPct":12.0,"vacancyExact2026":0,"vacancyTotal2026":12},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2599,"high":3762,"r2_2026":2342,"modelP50":2860,"historicalReference":2852,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":8,"vacancyTotal2026":12},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13493,"high":25890,"r2_2026":12257,"modelP50":15613,"historicalReference":20009,"modelHistoryDisagreementPct":28.2,"vacancyExact2026":1,"vacancyTotal2026":12}},"ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2681,"high":3599,"r2_2026":2736,"modelP50":2736,"historicalReference":2736,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":10},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5841,"high":8454,"r2_2026":5131,"modelP50":6427,"historicalReference":6422,"modelHistoryDisagreementPct":0.1,"vacancyExact2026":1,"vacancyTotal2026":10},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5291,"high":7182,"r2_2026":5399,"modelP50":5460,"historicalReference":5399,"modelHistoryDisagreementPct":1.1,"vacancyExact2026":0,"vacancyTotal2026":10},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2519,"high":4834,"r2_2026":2526,"modelP50":2915,"historicalReference":3729,"modelHistoryDisagreementPct":27.9,"vacancyExact2026":0,"vacancyTotal2026":10},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2491,"high":4779,"r2_2026":2595,"modelP50":2882,"historicalReference":3372,"modelHistoryDisagreementPct":17.0,"vacancyExact2026":0,"vacancyTotal2026":10},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2127,"high":3078,"r2_2026":1914,"modelP50":2340,"historicalReference":2381,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":5,"vacancyTotal2026":10},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4896,"high":7085,"r2_2026":4308,"modelP50":5387,"historicalReference":5989,"modelHistoryDisagreementPct":11.2,"vacancyExact2026":1,"vacancyTotal2026":10},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8018,"high":11164,"r2_2026":8182,"modelP50":8487,"historicalReference":8182,"modelHistoryDisagreementPct":3.6,"vacancyExact2026":0,"vacancyTotal2026":10}},"BIO-TECHNOLOGY":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":18644,"high":25135,"r2_2026":19024,"modelP50":19109,"historicalReference":19024,"modelHistoryDisagreementPct":0.4,"vacancyExact2026":0,"vacancyTotal2026":6},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":14988,"high":21692,"r2_2026":14150,"modelP50":16491,"historicalReference":14991,"modelHistoryDisagreementPct":9.1,"vacancyExact2026":1,"vacancyTotal2026":6},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13446,"high":18082,"r2_2026":13720,"modelP50":13747,"historicalReference":13720,"modelHistoryDisagreementPct":0.2,"vacancyExact2026":0,"vacancyTotal2026":6},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11939,"high":17103,"r2_2026":12183,"modelP50":13002,"historicalReference":12183,"modelHistoryDisagreementPct":6.3,"vacancyExact2026":0,"vacancyTotal2026":6},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":12520,"high":17736,"r2_2026":12775,"modelP50":13484,"historicalReference":12775,"modelHistoryDisagreementPct":5.3,"vacancyExact2026":0,"vacancyTotal2026":6},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9742,"high":14100,"r2_2026":9274,"modelP50":10719,"historicalReference":9279,"modelHistoryDisagreementPct":13.4,"vacancyExact2026":4,"vacancyTotal2026":6},"GMR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13302,"high":24609,"r2_2026":14002,"modelP50":14840,"historicalReference":17716,"modelHistoryDisagreementPct":19.4,"vacancyExact2026":0,"vacancyTotal2026":6}},"CHEMICAL ENGINEERING":{"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":39463,"high":75723,"r2_2026":35108,"modelP50":45665,"historicalReference":35108,"modelHistoryDisagreementPct":23.1,"vacancyExact2026":1,"vacancyTotal2026":5},"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":29245,"high":56115,"r2_2026":30349,"modelP50":33840,"historicalReference":39567,"modelHistoryDisagreementPct":16.9,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":19479,"high":37376,"r2_2026":17819,"modelP50":22540,"historicalReference":17819,"modelHistoryDisagreementPct":20.9,"vacancyExact2026":1,"vacancyTotal2026":5},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":14127,"high":20445,"r2_2026":12656,"modelP50":15543,"historicalReference":15271,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":3,"vacancyTotal2026":5},"GMR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":23279,"high":43552,"r2_2026":24504,"modelP50":26264,"historicalReference":33783,"modelHistoryDisagreementPct":28.6,"vacancyExact2026":0,"vacancyTotal2026":5}},"CIVIL ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":33657,"high":45175,"r2_2026":34344,"modelP50":34344,"historicalReference":34344,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":41111,"high":59500,"r2_2026":37838,"modelP50":45234,"historicalReference":43396,"modelHistoryDisagreementPct":4.1,"vacancyExact2026":1,"vacancyTotal2026":9},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":36402,"high":69848,"r2_2026":32323,"modelP50":42122,"historicalReference":32323,"modelHistoryDisagreementPct":23.3,"vacancyExact2026":1,"vacancyTotal2026":9},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":21893,"high":31315,"r2_2026":22340,"modelP50":23807,"historicalReference":22340,"modelHistoryDisagreementPct":6.2,"vacancyExact2026":0,"vacancyTotal2026":9},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":22058,"high":31925,"r2_2026":20323,"modelP50":24271,"historicalReference":20833,"modelHistoryDisagreementPct":14.2,"vacancyExact2026":3,"vacancyTotal2026":9},"GMR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":34537,"high":66270,"r2_2026":32117,"modelP50":39964,"historicalReference":32117,"modelHistoryDisagreementPct":19.6,"vacancyExact2026":1,"vacancyTotal2026":9}},"COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2402,"high":3224,"r2_2026":2451,"modelP50":2451,"historicalReference":2451,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":15},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5003,"high":7240,"r2_2026":4603,"modelP50":5504,"historicalReference":5867,"modelHistoryDisagreementPct":6.6,"vacancyExact2026":1,"vacancyTotal2026":15},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2230,"high":3227,"r2_2026":2174,"modelP50":2453,"historicalReference":2174,"modelHistoryDisagreementPct":11.4,"vacancyExact2026":0,"vacancyTotal2026":15},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2781,"high":4024,"r2_2026":2819,"modelP50":3059,"historicalReference":2819,"modelHistoryDisagreementPct":7.9,"vacancyExact2026":0,"vacancyTotal2026":15},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1903,"high":2755,"r2_2026":1763,"modelP50":2094,"historicalReference":2022,"modelHistoryDisagreementPct":3.5,"vacancyExact2026":10,"vacancyTotal2026":15},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6165,"high":8275,"r2_2026":6291,"modelP50":6291,"historicalReference":6291,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":15},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3970,"high":5745,"r2_2026":4028,"modelP50":4368,"historicalReference":4531,"modelHistoryDisagreementPct":3.7,"vacancyExact2026":0,"vacancyTotal2026":15},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10639,"high":20414,"r2_2026":9813,"modelP50":12310,"historicalReference":15484,"modelHistoryDisagreementPct":25.8,"vacancyExact2026":1,"vacancyTotal2026":15}},"COMPUTER SCIENCE AND ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2070,"high":2798,"r2_2026":2112,"modelP50":2127,"historicalReference":2112,"modelHistoryDisagreementPct":0.7,"vacancyExact2026":0,"vacancyTotal2026":17},"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3873,"high":7431,"r2_2026":3857,"modelP50":4481,"historicalReference":5508,"modelHistoryDisagreementPct":22.9,"vacancyExact2026":0,"vacancyTotal2026":17},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5204,"high":7066,"r2_2026":5310,"modelP50":5372,"historicalReference":5310,"modelHistoryDisagreementPct":1.1,"vacancyExact2026":0,"vacancyTotal2026":17},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1867,"high":3583,"r2_2026":1875,"modelP50":2160,"historicalReference":2515,"modelHistoryDisagreementPct":16.4,"vacancyExact2026":0,"vacancyTotal2026":17},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1997,"high":2890,"r2_2026":1987,"modelP50":2197,"historicalReference":2451,"modelHistoryDisagreementPct":11.5,"vacancyExact2026":0,"vacancyTotal2026":17},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1539,"high":2227,"r2_2026":1411,"modelP50":1693,"historicalReference":1736,"modelHistoryDisagreementPct":2.6,"vacancyExact2026":13,"vacancyTotal2026":17},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6224,"high":8354,"r2_2026":6351,"modelP50":6351,"historicalReference":6351,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":17},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3389,"high":4905,"r2_2026":3393,"modelP50":3729,"historicalReference":3745,"modelHistoryDisagreementPct":0.4,"vacancyExact2026":0,"vacancyTotal2026":17},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8108,"high":15557,"r2_2026":7510,"modelP50":9382,"historicalReference":7910,"modelHistoryDisagreementPct":15.7,"vacancyExact2026":2,"vacancyTotal2026":17}},"COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3622,"high":4862,"r2_2026":3696,"modelP50":3696,"historicalReference":3696,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6101,"high":8829,"r2_2026":5839,"modelP50":6713,"historicalReference":6619,"modelHistoryDisagreementPct":1.4,"vacancyExact2026":0,"vacancyTotal2026":7},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9103,"high":17467,"r2_2026":8283,"modelP50":10533,"historicalReference":8283,"modelHistoryDisagreementPct":21.4,"vacancyExact2026":1,"vacancyTotal2026":7},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3437,"high":4974,"r2_2026":3312,"modelP50":3782,"historicalReference":3312,"modelHistoryDisagreementPct":12.4,"vacancyExact2026":0,"vacancyTotal2026":7},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3135,"high":6015,"r2_2026":2895,"modelP50":3627,"historicalReference":3045,"modelHistoryDisagreementPct":16.0,"vacancyExact2026":1,"vacancyTotal2026":7},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2506,"high":3627,"r2_2026":2255,"modelP50":2757,"historicalReference":2807,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":5,"vacancyTotal2026":7},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3830,"high":5543,"r2_2026":3826,"modelP50":4214,"historicalReference":3826,"modelHistoryDisagreementPct":9.2,"vacancyExact2026":0,"vacancyTotal2026":7},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8383,"high":11610,"r2_2026":8554,"modelP50":8826,"historicalReference":9287,"modelHistoryDisagreementPct":5.2,"vacancyExact2026":0,"vacancyTotal2026":7}},"ELECTRICAL & ELECTRONICS ENGINEERING":{"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11438,"high":21948,"r2_2026":11622,"modelP50":13236,"historicalReference":15338,"modelHistoryDisagreementPct":15.9,"vacancyExact2026":0,"vacancyTotal2026":9},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":12585,"high":16952,"r2_2026":12842,"modelP50":12888,"historicalReference":12842,"modelHistoryDisagreementPct":0.4,"vacancyExact2026":0,"vacancyTotal2026":9},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8386,"high":16091,"r2_2026":8821,"modelP50":9703,"historicalReference":11441,"modelHistoryDisagreementPct":17.9,"vacancyExact2026":0,"vacancyTotal2026":9},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5083,"high":7357,"r2_2026":4481,"modelP50":5593,"historicalReference":6210,"modelHistoryDisagreementPct":11.0,"vacancyExact2026":5,"vacancyTotal2026":9}},"ELECTRONICS AND COMMUNICATION ENGG":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4285,"high":5809,"r2_2026":4372,"modelP50":4416,"historicalReference":4381,"modelHistoryDisagreementPct":0.8,"vacancyExact2026":0,"vacancyTotal2026":10},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5070,"high":7338,"r2_2026":4808,"modelP50":5579,"historicalReference":5548,"modelHistoryDisagreementPct":0.6,"vacancyExact2026":0,"vacancyTotal2026":10},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4997,"high":6822,"r2_2026":5099,"modelP50":5186,"historicalReference":5099,"modelHistoryDisagreementPct":1.7,"vacancyExact2026":0,"vacancyTotal2026":10},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3626,"high":5247,"r2_2026":3453,"modelP50":3989,"historicalReference":4198,"modelHistoryDisagreementPct":5.2,"vacancyExact2026":0,"vacancyTotal2026":10},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3355,"high":4856,"r2_2026":3352,"modelP50":3692,"historicalReference":3893,"modelHistoryDisagreementPct":5.5,"vacancyExact2026":0,"vacancyTotal2026":10},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2312,"high":3346,"r2_2026":2094,"modelP50":2543,"historicalReference":2281,"modelHistoryDisagreementPct":10.3,"vacancyExact2026":7,"vacancyTotal2026":10},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10166,"high":13644,"r2_2026":10373,"modelP50":10373,"historicalReference":10373,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":10},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5418,"high":7842,"r2_2026":5435,"modelP50":5962,"historicalReference":5806,"modelHistoryDisagreementPct":2.6,"vacancyExact2026":0,"vacancyTotal2026":10},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":15848,"high":22937,"r2_2026":13582,"modelP50":17438,"historicalReference":16889,"modelHistoryDisagreementPct":3.1,"vacancyExact2026":1,"vacancyTotal2026":10}},"ELECTRONICS AND INSTRUMENTATION ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":18816,"high":25255,"r2_2026":19200,"modelP50":19200,"historicalReference":19395,"modelHistoryDisagreementPct":1.0,"vacancyExact2026":0,"vacancyTotal2026":8},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":15422,"high":22320,"r2_2026":14555,"modelP50":16969,"historicalReference":19417,"modelHistoryDisagreementPct":14.4,"vacancyExact2026":0,"vacancyTotal2026":8},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10384,"high":15029,"r2_2026":9918,"modelP50":11426,"historicalReference":11217,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":0,"vacancyTotal2026":8},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11962,"high":17313,"r2_2026":11980,"modelP50":13162,"historicalReference":12994,"modelHistoryDisagreementPct":1.3,"vacancyExact2026":0,"vacancyTotal2026":8},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6429,"high":9305,"r2_2026":5677,"modelP50":7074,"historicalReference":7599,"modelHistoryDisagreementPct":7.4,"vacancyExact2026":7,"vacancyTotal2026":8}},"ELECTRONICS AND TELECOMMUNICATION ENGINEERING":{"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8971,"high":12984,"r2_2026":8769,"modelP50":9871,"historicalReference":10922,"modelHistoryDisagreementPct":10.7,"vacancyExact2026":0,"vacancyTotal2026":6},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5364,"high":7763,"r2_2026":5418,"modelP50":5902,"historicalReference":6335,"modelHistoryDisagreementPct":7.3,"vacancyExact2026":0,"vacancyTotal2026":6},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4565,"high":6607,"r2_2026":4164,"modelP50":5023,"historicalReference":4695,"modelHistoryDisagreementPct":6.5,"vacancyExact2026":4,"vacancyTotal2026":6},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11325,"high":16264,"r2_2026":11556,"modelP50":12364,"historicalReference":11556,"modelHistoryDisagreementPct":6.5,"vacancyExact2026":0,"vacancyTotal2026":6},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":19169,"high":26241,"r2_2026":19560,"modelP50":19949,"historicalReference":19560,"modelHistoryDisagreementPct":2.0,"vacancyExact2026":0,"vacancyTotal2026":6}},"INDUSTRIAL ENGINEERING & MANAGEMENT":{"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":36919,"high":70840,"r2_2026":35472,"modelP50":42720,"historicalReference":53015,"modelHistoryDisagreementPct":24.1,"vacancyExact2026":1,"vacancyTotal2026":6},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":29118,"high":39082,"r2_2026":29712,"modelP50":29712,"historicalReference":29712,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":6},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":27978,"high":40492,"r2_2026":25008,"modelP50":30784,"historicalReference":33917,"modelHistoryDisagreementPct":10.2,"vacancyExact2026":1,"vacancyTotal2026":6},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":25282,"high":36100,"r2_2026":25798,"modelP50":27445,"historicalReference":25798,"modelHistoryDisagreementPct":6.0,"vacancyExact2026":0,"vacancyTotal2026":6},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":21683,"high":31381,"r2_2026":19665,"modelP50":23858,"historicalReference":21004,"modelHistoryDisagreementPct":12.0,"vacancyExact2026":2,"vacancyTotal2026":6},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":35268,"high":50190,"r2_2026":35988,"modelP50":38157,"historicalReference":40895,"modelHistoryDisagreementPct":7.2,"vacancyExact2026":0,"vacancyTotal2026":6}},"INFORMATION SCIENCE AND ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5844,"high":7873,"r2_2026":5963,"modelP50":5985,"historicalReference":5963,"modelHistoryDisagreementPct":0.4,"vacancyExact2026":0,"vacancyTotal2026":6},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5574,"high":8067,"r2_2026":5359,"modelP50":6133,"historicalReference":5359,"modelHistoryDisagreementPct":12.6,"vacancyExact2026":0,"vacancyTotal2026":6},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8416,"high":11396,"r2_2026":8588,"modelP50":8663,"historicalReference":8588,"modelHistoryDisagreementPct":0.9,"vacancyExact2026":0,"vacancyTotal2026":6},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3423,"high":4955,"r2_2026":3319,"modelP50":3767,"historicalReference":3319,"modelHistoryDisagreementPct":11.9,"vacancyExact2026":0,"vacancyTotal2026":6},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3855,"high":7397,"r2_2026":3522,"modelP50":4461,"historicalReference":3603,"modelHistoryDisagreementPct":19.2,"vacancyExact2026":1,"vacancyTotal2026":6},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3060,"high":4429,"r2_2026":2761,"modelP50":3367,"historicalReference":2862,"modelHistoryDisagreementPct":15.0,"vacancyExact2026":4,"vacancyTotal2026":6},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5999,"high":8051,"r2_2026":6121,"modelP50":6121,"historicalReference":6121,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":6},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5675,"high":8213,"r2_2026":5699,"modelP50":6244,"historicalReference":5699,"modelHistoryDisagreementPct":8.7,"vacancyExact2026":0,"vacancyTotal2026":6},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11794,"high":22631,"r2_2026":10299,"modelP50":13648,"historicalReference":10459,"modelHistoryDisagreementPct":23.4,"vacancyExact2026":1,"vacancyTotal2026":6}},"MECHANICAL ENGINEERING":{"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":21374,"high":30934,"r2_2026":18864,"modelP50":23517,"historicalReference":24534,"modelHistoryDisagreementPct":4.3,"vacancyExact2026":1,"vacancyTotal2026":10},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11233,"high":21554,"r2_2026":11608,"modelP50":12998,"historicalReference":15016,"modelHistoryDisagreementPct":15.5,"vacancyExact2026":0,"vacancyTotal2026":10},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11933,"high":22382,"r2_2026":12561,"modelP50":13497,"historicalReference":16978,"modelHistoryDisagreementPct":25.8,"vacancyExact2026":0,"vacancyTotal2026":10},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11621,"high":16819,"r2_2026":10607,"modelP50":12786,"historicalReference":14232,"modelHistoryDisagreementPct":11.3,"vacancyExact2026":9,"vacancyTotal2026":10},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":31230,"high":41917,"r2_2026":31867,"modelP50":31867,"historicalReference":31867,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":10},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":31906,"high":43656,"r2_2026":32557,"modelP50":33189,"historicalReference":32557,"modelHistoryDisagreementPct":1.9,"vacancyExact2026":0,"vacancyTotal2026":10}},"MEDICAL ELECTRONICS ENGINEERING":{"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":36732,"high":70482,"r2_2026":32710,"modelP50":42504,"historicalReference":32710,"modelHistoryDisagreementPct":23.0,"vacancyExact2026":1,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":34113,"high":49371,"r2_2026":33926,"modelP50":37534,"historicalReference":37520,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":30203,"high":57953,"r2_2026":26860,"modelP50":34949,"historicalReference":26860,"modelHistoryDisagreementPct":23.1,"vacancyExact2026":1,"vacancyTotal2026":9},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":26394,"high":50646,"r2_2026":24343,"modelP50":30542,"historicalReference":24343,"modelHistoryDisagreementPct":20.3,"vacancyExact2026":1,"vacancyTotal2026":9},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":20964,"high":30341,"r2_2026":18753,"modelP50":23066,"historicalReference":20801,"modelHistoryDisagreementPct":9.8,"vacancyExact2026":4,"vacancyTotal2026":9},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":32439,"high":43540,"r2_2026":33101,"modelP50":33101,"historicalReference":33101,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":43016,"high":60882,"r2_2026":43894,"modelP50":46285,"historicalReference":43894,"modelHistoryDisagreementPct":5.2,"vacancyExact2026":0,"vacancyTotal2026":9}}},"RVCE":{"AERO SPACE ENGINEERING":{"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8895,"high":17068,"r2_2026":7217,"modelP50":10293,"historicalReference":7217,"modelHistoryDisagreementPct":29.9,"vacancyExact2026":1,"vacancyTotal2026":9},"2AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9989,"high":13408,"r2_2026":10193,"modelP50":10193,"historicalReference":10193,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8284,"high":11351,"r2_2026":8454,"modelP50":8629,"historicalReference":8454,"modelHistoryDisagreementPct":2.0,"vacancyExact2026":0,"vacancyTotal2026":9},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4689,"high":6369,"r2_2026":4785,"modelP50":4842,"historicalReference":4785,"modelHistoryDisagreementPct":1.2,"vacancyExact2026":0,"vacancyTotal2026":9},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2983,"high":4004,"r2_2026":3044,"modelP50":3044,"historicalReference":3044,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1661,"high":2404,"r2_2026":1662,"modelP50":1827,"historicalReference":1687,"modelHistoryDisagreementPct":7.7,"vacancyExact2026":5,"vacancyTotal2026":9}},"BIO-TECHNOLOGY":{"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9944,"high":19080,"r2_2026":9159,"modelP50":11506,"historicalReference":9159,"modelHistoryDisagreementPct":20.4,"vacancyExact2026":1,"vacancyTotal2026":10},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6152,"high":8903,"r2_2026":5960,"modelP50":6769,"historicalReference":5960,"modelHistoryDisagreementPct":11.9,"vacancyExact2026":4,"vacancyTotal2026":10},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8068,"high":10829,"r2_2026":8233,"modelP50":8233,"historicalReference":8233,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":10}},"CHEMICAL ENGINEERING":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6531,"high":9452,"r2_2026":6088,"modelP50":7186,"historicalReference":8194,"modelHistoryDisagreementPct":14.0,"vacancyExact2026":3,"vacancyTotal2026":6},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11612,"high":15601,"r2_2026":11849,"modelP50":11860,"historicalReference":11849,"modelHistoryDisagreementPct":0.1,"vacancyExact2026":0,"vacancyTotal2026":6},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":47768,"high":91659,"r2_2026":41780,"modelP50":55275,"historicalReference":41780,"modelHistoryDisagreementPct":24.4,"vacancyExact2026":1,"vacancyTotal2026":6}},"CIVIL ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":29867,"high":40088,"r2_2026":30477,"modelP50":30477,"historicalReference":30477,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":12099,"high":16240,"r2_2026":12346,"modelP50":12346,"historicalReference":12346,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8527,"high":12342,"r2_2026":8184,"modelP50":9383,"historicalReference":8243,"modelHistoryDisagreementPct":12.1,"vacancyExact2026":3,"vacancyTotal2026":5},"GMR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":26301,"high":50467,"r2_2026":23301,"modelP50":30434,"historicalReference":37615,"modelHistoryDisagreementPct":23.6,"vacancyExact2026":1,"vacancyTotal2026":5}},"COMPUTER SCIENCE AND ENGG(ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING)":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":976,"high":1314,"r2_2026":996,"modelP50":999,"historicalReference":996,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":0,"vacancyTotal2026":23},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1279,"high":1851,"r2_2026":1242,"modelP50":1407,"historicalReference":1242,"modelHistoryDisagreementPct":11.8,"vacancyExact2026":2,"vacancyTotal2026":23},"2AK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3172,"high":4337,"r2_2026":3237,"modelP50":3297,"historicalReference":3237,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":0,"vacancyTotal2026":23},"2AR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2619,"high":5025,"r2_2026":2355,"modelP50":3031,"historicalReference":2355,"modelHistoryDisagreementPct":22.3,"vacancyExact2026":1,"vacancyTotal2026":23},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1861,"high":3303,"r2_2026":1959,"modelP50":1992,"historicalReference":2411,"modelHistoryDisagreementPct":21.0,"vacancyExact2026":0,"vacancyTotal2026":23},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":701,"high":1015,"r2_2026":679,"modelP50":772,"historicalReference":679,"modelHistoryDisagreementPct":12.0,"vacancyExact2026":2,"vacancyTotal2026":23},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":674,"high":919,"r2_2026":688,"modelP50":699,"historicalReference":704,"modelHistoryDisagreementPct":0.8,"vacancyExact2026":0,"vacancyTotal2026":23},"3BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1136,"high":1608,"r2_2026":1159,"modelP50":1223,"historicalReference":1182,"modelHistoryDisagreementPct":3.3,"vacancyExact2026":0,"vacancyTotal2026":23},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":434,"high":628,"r2_2026":424,"modelP50":477,"historicalReference":465,"modelHistoryDisagreementPct":2.5,"vacancyExact2026":10,"vacancyTotal2026":23},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1055,"high":1454,"r2_2026":1077,"modelP50":1106,"historicalReference":1077,"modelHistoryDisagreementPct":2.6,"vacancyExact2026":0,"vacancyTotal2026":23},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1114,"high":1497,"r2_2026":1137,"modelP50":1138,"historicalReference":1137,"modelHistoryDisagreementPct":0.1,"vacancyExact2026":0,"vacancyTotal2026":23},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2906,"high":5577,"r2_2026":2614,"modelP50":3363,"historicalReference":2624,"modelHistoryDisagreementPct":22.0,"vacancyExact2026":1,"vacancyTotal2026":23}},"COMPUTER SCIENCE AND ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":686,"high":921,"r2_2026":700,"modelP50":700,"historicalReference":700,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":34},"1R":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1468,"high":2109,"r2_2026":1498,"modelP50":1603,"historicalReference":1498,"modelHistoryDisagreementPct":6.6,"vacancyExact2026":0,"vacancyTotal2026":34},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1121,"high":1623,"r2_2026":1089,"modelP50":1234,"historicalReference":1345,"modelHistoryDisagreementPct":9.0,"vacancyExact2026":2,"vacancyTotal2026":34},"2AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1355,"high":1961,"r2_2026":1203,"modelP50":1491,"historicalReference":1430,"modelHistoryDisagreementPct":4.0,"vacancyExact2026":1,"vacancyTotal2026":34},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1844,"high":3275,"r2_2026":1941,"modelP50":1975,"historicalReference":2281,"modelHistoryDisagreementPct":15.5,"vacancyExact2026":0,"vacancyTotal2026":34},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":532,"high":770,"r2_2026":517,"modelP50":585,"historicalReference":517,"modelHistoryDisagreementPct":11.6,"vacancyExact2026":1,"vacancyTotal2026":34},"3AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":794,"high":1112,"r2_2026":810,"modelP50":846,"historicalReference":810,"modelHistoryDisagreementPct":4.2,"vacancyExact2026":0,"vacancyTotal2026":34},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":477,"high":654,"r2_2026":487,"modelP50":497,"historicalReference":487,"modelHistoryDisagreementPct":2.1,"vacancyExact2026":0,"vacancyTotal2026":34},"3BK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1675,"high":2255,"r2_2026":1709,"modelP50":1714,"historicalReference":1709,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":0,"vacancyTotal2026":34},"3BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":865,"high":1221,"r2_2026":883,"modelP50":929,"historicalReference":883,"modelHistoryDisagreementPct":4.9,"vacancyExact2026":0,"vacancyTotal2026":34},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":293,"high":424,"r2_2026":285,"modelP50":322,"historicalReference":319,"modelHistoryDisagreementPct":1.1,"vacancyExact2026":13,"vacancyTotal2026":34},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1036,"high":1429,"r2_2026":1057,"modelP50":1086,"historicalReference":1237,"modelHistoryDisagreementPct":13.9,"vacancyExact2026":0,"vacancyTotal2026":34},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":671,"high":972,"r2_2026":641,"modelP50":739,"historicalReference":641,"modelHistoryDisagreementPct":13.2,"vacancyExact2026":1,"vacancyTotal2026":34},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2190,"high":4203,"r2_2026":2039,"modelP50":2534,"historicalReference":2039,"modelHistoryDisagreementPct":19.5,"vacancyExact2026":1,"vacancyTotal2026":34},"STR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3898,"high":5498,"r2_2026":3978,"modelP50":4180,"historicalReference":3978,"modelHistoryDisagreementPct":4.8,"vacancyExact2026":0,"vacancyTotal2026":34}},"COMPUTER SCIENCE AND ENGINEERING (CYBER SECURITY)":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1431,"high":1920,"r2_2026":1460,"modelP50":1460,"historicalReference":1460,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7},"1R":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2594,"high":4977,"r2_2026":2286,"modelP50":3001,"historicalReference":2286,"modelHistoryDisagreementPct":23.8,"vacancyExact2026":1,"vacancyTotal2026":7},"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1430,"high":2573,"r2_2026":1505,"modelP50":1552,"historicalReference":1803,"modelHistoryDisagreementPct":16.2,"vacancyExact2026":0,"vacancyTotal2026":7},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1159,"high":1593,"r2_2026":1183,"modelP50":1211,"historicalReference":1183,"modelHistoryDisagreementPct":2.3,"vacancyExact2026":0,"vacancyTotal2026":7},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":824,"high":1106,"r2_2026":841,"modelP50":841,"historicalReference":841,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":510,"high":739,"r2_2026":481,"modelP50":562,"historicalReference":572,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":5,"vacancyTotal2026":7},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1561,"high":2095,"r2_2026":1593,"modelP50":1593,"historicalReference":1593,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7}},"COMPUTER SCIENCE AND ENGINEERING(DATA SCIENCE)":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1784,"high":2394,"r2_2026":1820,"modelP50":1820,"historicalReference":1820,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1416,"high":2050,"r2_2026":1360,"modelP50":1558,"historicalReference":1589,"modelHistoryDisagreementPct":2.0,"vacancyExact2026":1,"vacancyTotal2026":7},"2BK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5893,"high":7909,"r2_2026":6013,"modelP50":6013,"historicalReference":6013,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":809,"high":1437,"r2_2026":852,"modelP50":867,"historicalReference":661,"modelHistoryDisagreementPct":23.8,"vacancyExact2026":0,"vacancyTotal2026":7},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":917,"high":1231,"r2_2026":936,"modelP50":936,"historicalReference":936,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":479,"high":693,"r2_2026":448,"modelP50":527,"historicalReference":584,"modelHistoryDisagreementPct":10.8,"vacancyExact2026":5,"vacancyTotal2026":7},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1559,"high":2093,"r2_2026":1591,"modelP50":1591,"historicalReference":1591,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7}},"ELECTRICAL & ELECTRONICS ENGINEERING":{"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3890,"high":7465,"r2_2026":3396,"modelP50":4501,"historicalReference":3396,"modelHistoryDisagreementPct":24.6,"vacancyExact2026":1,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4335,"high":6274,"r2_2026":4118,"modelP50":4770,"historicalReference":4118,"modelHistoryDisagreementPct":13.7,"vacancyExact2026":2,"vacancyTotal2026":9},"2BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":26575,"high":35669,"r2_2026":27117,"modelP50":27117,"historicalReference":27117,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1334,"high":1859,"r2_2026":1361,"modelP50":1413,"historicalReference":1390,"modelHistoryDisagreementPct":1.6,"vacancyExact2026":0,"vacancyTotal2026":9},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2111,"high":2834,"r2_2026":2154,"modelP50":2155,"historicalReference":2154,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"GM":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":968,"high":1857,"r2_2026":961,"modelP50":1120,"historicalReference":1450,"modelHistoryDisagreementPct":29.4,"vacancyExact2026":4,"vacancyTotal2026":9},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3943,"high":5292,"r2_2026":4024,"modelP50":4024,"historicalReference":4024,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9}},"ELECTRONICS AND COMMUNICATION ENGG":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2328,"high":3134,"r2_2026":2376,"modelP50":2383,"historicalReference":2376,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":0,"vacancyTotal2026":19},"1R":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3735,"high":5275,"r2_2026":3811,"modelP50":4011,"historicalReference":3811,"modelHistoryDisagreementPct":5.0,"vacancyExact2026":0,"vacancyTotal2026":19},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1773,"high":2566,"r2_2026":1708,"modelP50":1951,"historicalReference":1991,"modelHistoryDisagreementPct":2.1,"vacancyExact2026":1,"vacancyTotal2026":19},"2AK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5123,"high":6998,"r2_2026":5228,"modelP50":5320,"historicalReference":5228,"modelHistoryDisagreementPct":1.7,"vacancyExact2026":0,"vacancyTotal2026":19},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3204,"high":4313,"r2_2026":3269,"modelP50":3279,"historicalReference":3269,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":0,"vacancyTotal2026":19},"2BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5347,"high":7399,"r2_2026":5456,"modelP50":5625,"historicalReference":5456,"modelHistoryDisagreementPct":3.0,"vacancyExact2026":0,"vacancyTotal2026":19},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1393,"high":2674,"r2_2026":1295,"modelP50":1612,"historicalReference":1295,"modelHistoryDisagreementPct":19.7,"vacancyExact2026":1,"vacancyTotal2026":19},"3BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2766,"high":3879,"r2_2026":2822,"modelP50":2949,"historicalReference":2822,"modelHistoryDisagreementPct":4.3,"vacancyExact2026":0,"vacancyTotal2026":19},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":611,"high":884,"r2_2026":584,"modelP50":672,"historicalReference":703,"modelHistoryDisagreementPct":4.5,"vacancyExact2026":11,"vacancyTotal2026":19},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3530,"high":4839,"r2_2026":3602,"modelP50":3679,"historicalReference":3602,"modelHistoryDisagreementPct":2.1,"vacancyExact2026":0,"vacancyTotal2026":19},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1918,"high":2589,"r2_2026":1957,"modelP50":1968,"historicalReference":2042,"modelHistoryDisagreementPct":3.7,"vacancyExact2026":0,"vacancyTotal2026":19},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4192,"high":8045,"r2_2026":3776,"modelP50":4851,"historicalReference":3776,"modelHistoryDisagreementPct":22.2,"vacancyExact2026":2,"vacancyTotal2026":19}},"ELECTRONICS AND TELECOMMUNICATION ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6121,"high":8216,"r2_2026":6246,"modelP50":6246,"historicalReference":6246,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3468,"high":5019,"r2_2026":3325,"modelP50":3816,"historicalReference":3325,"modelHistoryDisagreementPct":12.9,"vacancyExact2026":1,"vacancyTotal2026":9},"2AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3415,"high":4588,"r2_2026":3485,"modelP50":3488,"historicalReference":3485,"modelHistoryDisagreementPct":0.1,"vacancyExact2026":0,"vacancyTotal2026":9},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1748,"high":2347,"r2_2026":1784,"modelP50":1784,"historicalReference":1784,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"GM":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":709,"high":1360,"r2_2026":722,"modelP50":820,"historicalReference":681,"modelHistoryDisagreementPct":16.9,"vacancyExact2026":3,"vacancyTotal2026":9},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3348,"high":4493,"r2_2026":3416,"modelP50":3416,"historicalReference":3416,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6823,"high":9158,"r2_2026":6962,"modelP50":6962,"historicalReference":6962,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9}},"INDUSTRIAL ENGINEERING & MANAGEMENT":{"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11603,"high":16102,"r2_2026":11840,"modelP50":12242,"historicalReference":11840,"modelHistoryDisagreementPct":3.3,"vacancyExact2026":0,"vacancyTotal2026":5},"2AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":31380,"high":42118,"r2_2026":32020,"modelP50":32020,"historicalReference":32020,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":19172,"high":25733,"r2_2026":19563,"modelP50":19563,"historicalReference":19563,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11847,"high":21373,"r2_2026":12471,"modelP50":12889,"historicalReference":16123,"modelHistoryDisagreementPct":25.1,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13007,"high":24959,"r2_2026":11722,"modelP50":15051,"historicalReference":11722,"modelHistoryDisagreementPct":22.1,"vacancyExact2026":1,"vacancyTotal2026":5},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9515,"high":13770,"r2_2026":8893,"modelP50":10469,"historicalReference":10681,"modelHistoryDisagreementPct":2.0,"vacancyExact2026":3,"vacancyTotal2026":5},"GMR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":21360,"high":37284,"r2_2026":22484,"modelP50":22484,"historicalReference":26516,"modelHistoryDisagreementPct":17.9,"vacancyExact2026":0,"vacancyTotal2026":5},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":29596,"high":39724,"r2_2026":30200,"modelP50":30200,"historicalReference":30200,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5}},"MECHANICAL ENGINEERING":{"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10678,"high":20489,"r2_2026":9540,"modelP50":12356,"historicalReference":9540,"modelHistoryDisagreementPct":22.8,"vacancyExact2026":1,"vacancyTotal2026":16},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7749,"high":11215,"r2_2026":7283,"modelP50":8526,"historicalReference":8309,"modelHistoryDisagreementPct":2.5,"vacancyExact2026":1,"vacancyTotal2026":16},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13809,"high":18535,"r2_2026":14091,"modelP50":14091,"historicalReference":14091,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":16},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4469,"high":8001,"r2_2026":4704,"modelP50":4825,"historicalReference":5593,"modelHistoryDisagreementPct":15.9,"vacancyExact2026":0,"vacancyTotal2026":16},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7080,"high":10247,"r2_2026":6146,"modelP50":7790,"historicalReference":7610,"modelHistoryDisagreementPct":2.3,"vacancyExact2026":1,"vacancyTotal2026":16},"3BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":16368,"high":22132,"r2_2026":16702,"modelP50":16826,"historicalReference":16702,"modelHistoryDisagreementPct":0.7,"vacancyExact2026":0,"vacancyTotal2026":16},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3967,"high":5742,"r2_2026":3774,"modelP50":4365,"historicalReference":4380,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":7,"vacancyTotal2026":16},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":20663,"high":27735,"r2_2026":21085,"modelP50":21085,"historicalReference":21085,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":16},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13137,"high":17682,"r2_2026":13405,"modelP50":13442,"historicalReference":13405,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":0,"vacancyTotal2026":16},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":18630,"high":35748,"r2_2026":16335,"modelP50":21557,"historicalReference":16335,"modelHistoryDisagreementPct":24.2,"vacancyExact2026":2,"vacancyTotal2026":16}}},"PES":{"B.TECH IN BIO-TECHNOLOGY":{"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":26548,"high":50942,"r2_2026":23574,"modelP50":30720,"historicalReference":36135,"modelHistoryDisagreementPct":17.6,"vacancyExact2026":1,"vacancyTotal2026":7},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":16221,"high":23477,"r2_2026":15766,"modelP50":17848,"historicalReference":17273,"modelHistoryDisagreementPct":3.2,"vacancyExact2026":0,"vacancyTotal2026":7},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10769,"high":15587,"r2_2026":10003,"modelP50":11850,"historicalReference":10076,"modelHistoryDisagreementPct":15.0,"vacancyExact2026":1,"vacancyTotal2026":7},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13735,"high":19879,"r2_2026":13915,"modelP50":15113,"historicalReference":13915,"modelHistoryDisagreementPct":7.9,"vacancyExact2026":0,"vacancyTotal2026":7},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7953,"high":11511,"r2_2026":7475,"modelP50":8751,"historicalReference":8655,"modelHistoryDisagreementPct":1.1,"vacancyExact2026":2,"vacancyTotal2026":7},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":26239,"high":37976,"r2_2026":24180,"modelP50":28871,"historicalReference":25872,"modelHistoryDisagreementPct":10.4,"vacancyExact2026":1,"vacancyTotal2026":7},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":36048,"high":48384,"r2_2026":36784,"modelP50":36784,"historicalReference":36784,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":7}},"B.TECH IN COMPUTER SCIENCE & ENGINEERING (AI & ML)":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3387,"high":4643,"r2_2026":3456,"modelP50":3530,"historicalReference":3456,"modelHistoryDisagreementPct":2.1,"vacancyExact2026":0,"vacancyTotal2026":0},"1R":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6335,"high":8503,"r2_2026":6464,"modelP50":6464,"historicalReference":6464,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":0},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3840,"high":5558,"r2_2026":3621,"modelP50":4225,"historicalReference":3696,"modelHistoryDisagreementPct":12.5,"vacancyExact2026":0,"vacancyTotal2026":0},"2AK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5534,"high":7926,"r2_2026":5647,"modelP50":6026,"historicalReference":5647,"modelHistoryDisagreementPct":6.3,"vacancyExact2026":0,"vacancyTotal2026":0},"2AR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4276,"high":8152,"r2_2026":4501,"modelP50":4916,"historicalReference":6295,"modelHistoryDisagreementPct":28.0,"vacancyExact2026":0,"vacancyTotal2026":0},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4265,"high":8031,"r2_2026":4489,"modelP50":4843,"historicalReference":6127,"modelHistoryDisagreementPct":26.5,"vacancyExact2026":0,"vacancyTotal2026":0},"3AR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3005,"high":5724,"r2_2026":3163,"modelP50":3452,"historicalReference":4365,"modelHistoryDisagreementPct":26.4,"vacancyExact2026":0,"vacancyTotal2026":0},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1797,"high":2600,"r2_2026":1787,"modelP50":1977,"historicalReference":2174,"modelHistoryDisagreementPct":10.0,"vacancyExact2026":0,"vacancyTotal2026":0},"3BK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5460,"high":7504,"r2_2026":5571,"modelP50":5705,"historicalReference":5571,"modelHistoryDisagreementPct":2.3,"vacancyExact2026":0,"vacancyTotal2026":0},"3BR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2946,"high":5491,"r2_2026":3101,"modelP50":3311,"historicalReference":4173,"modelHistoryDisagreementPct":26.0,"vacancyExact2026":0,"vacancyTotal2026":0},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1385,"high":2005,"r2_2026":1303,"modelP50":1524,"historicalReference":1619,"modelHistoryDisagreementPct":6.2,"vacancyExact2026":0,"vacancyTotal2026":0},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5406,"high":7256,"r2_2026":5516,"modelP50":5516,"historicalReference":5516,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":0},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3159,"high":4572,"r2_2026":3094,"modelP50":3476,"historicalReference":3502,"modelHistoryDisagreementPct":0.8,"vacancyExact2026":0,"vacancyTotal2026":0},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10000,"high":13475,"r2_2026":10204,"modelP50":10244,"historicalReference":10669,"modelHistoryDisagreementPct":4.1,"vacancyExact2026":0,"vacancyTotal2026":0},"STR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10600,"high":19469,"r2_2026":11158,"modelP50":11741,"historicalReference":13986,"modelHistoryDisagreementPct":19.1,"vacancyExact2026":0,"vacancyTotal2026":0}},"B.TECH IN COMPUTER SCIENCE AND ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2618,"high":3576,"r2_2026":2671,"modelP50":2719,"historicalReference":2671,"modelHistoryDisagreementPct":1.8,"vacancyExact2026":0,"vacancyTotal2026":61},"1R":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3379,"high":4646,"r2_2026":3448,"modelP50":3532,"historicalReference":3448,"modelHistoryDisagreementPct":2.4,"vacancyExact2026":0,"vacancyTotal2026":61},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2837,"high":4106,"r2_2026":2646,"modelP50":3122,"historicalReference":2845,"modelHistoryDisagreementPct":8.9,"vacancyExact2026":2,"vacancyTotal2026":61},"2AK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6167,"high":8565,"r2_2026":6293,"modelP50":6511,"historicalReference":6293,"modelHistoryDisagreementPct":3.4,"vacancyExact2026":0,"vacancyTotal2026":61},"2AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4147,"high":6002,"r2_2026":3644,"modelP50":4563,"historicalReference":4622,"modelHistoryDisagreementPct":1.3,"vacancyExact2026":1,"vacancyTotal2026":61},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4388,"high":6343,"r2_2026":4478,"modelP50":4822,"historicalReference":5390,"modelHistoryDisagreementPct":11.8,"vacancyExact2026":0,"vacancyTotal2026":61},"2BK":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11558,"high":22177,"r2_2026":11051,"modelP50":13374,"historicalReference":11051,"modelHistoryDisagreementPct":17.4,"vacancyExact2026":1,"vacancyTotal2026":61},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1648,"high":2384,"r2_2026":1513,"modelP50":1813,"historicalReference":1600,"modelHistoryDisagreementPct":11.7,"vacancyExact2026":2,"vacancyTotal2026":61},"3AR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2918,"high":4224,"r2_2026":2908,"modelP50":3211,"historicalReference":2977,"modelHistoryDisagreementPct":7.3,"vacancyExact2026":0,"vacancyTotal2026":61},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1620,"high":2345,"r2_2026":1489,"modelP50":1783,"historicalReference":1659,"modelHistoryDisagreementPct":7.0,"vacancyExact2026":1,"vacancyTotal2026":61},"3BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2656,"high":3845,"r2_2026":2705,"modelP50":2923,"historicalReference":2924,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":61},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":982,"high":1422,"r2_2026":908,"modelP50":1081,"historicalReference":1092,"modelHistoryDisagreementPct":1.0,"vacancyExact2026":42,"vacancyTotal2026":61},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5143,"high":7120,"r2_2026":5248,"modelP50":5413,"historicalReference":5305,"modelHistoryDisagreementPct":2.0,"vacancyExact2026":0,"vacancyTotal2026":61},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2461,"high":3562,"r2_2026":2396,"modelP50":2708,"historicalReference":2548,"modelHistoryDisagreementPct":5.9,"vacancyExact2026":0,"vacancyTotal2026":61},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9356,"high":13542,"r2_2026":8770,"modelP50":10295,"historicalReference":8770,"modelHistoryDisagreementPct":14.8,"vacancyExact2026":1,"vacancyTotal2026":61},"STR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9050,"high":16299,"r2_2026":9526,"modelP50":9829,"historicalReference":11533,"modelHistoryDisagreementPct":17.3,"vacancyExact2026":0,"vacancyTotal2026":61}},"B.TECH IN ELECTRICAL & ELECTRONICS ENGINEERING":{"2AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7248,"high":13908,"r2_2026":7152,"modelP50":8387,"historicalReference":9885,"modelHistoryDisagreementPct":17.9,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8964,"high":12973,"r2_2026":9051,"modelP50":9863,"historicalReference":9051,"modelHistoryDisagreementPct":8.2,"vacancyExact2026":0,"vacancyTotal2026":5},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":15064,"high":21802,"r2_2026":15219,"modelP50":16575,"historicalReference":16745,"modelHistoryDisagreementPct":1.0,"vacancyExact2026":0,"vacancyTotal2026":5}},"B.TECH IN ELECTRONICS & COMMUNICATION ENGINEERING":{"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6404,"high":8867,"r2_2026":6535,"modelP50":6741,"historicalReference":6535,"modelHistoryDisagreementPct":3.1,"vacancyExact2026":0,"vacancyTotal2026":37},"1R":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9783,"high":13131,"r2_2026":9983,"modelP50":9983,"historicalReference":9983,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":37},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5979,"high":8653,"r2_2026":5575,"modelP50":6578,"historicalReference":6722,"modelHistoryDisagreementPct":2.2,"vacancyExact2026":1,"vacancyTotal2026":37},"2AR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10576,"high":20293,"r2_2026":9776,"modelP50":12238,"historicalReference":15156,"modelHistoryDisagreementPct":23.8,"vacancyExact2026":1,"vacancyTotal2026":37},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9067,"high":17399,"r2_2026":8634,"modelP50":10492,"historicalReference":8634,"modelHistoryDisagreementPct":17.7,"vacancyExact2026":1,"vacancyTotal2026":37},"2BR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9511,"high":13765,"r2_2026":9195,"modelP50":10465,"historicalReference":9195,"modelHistoryDisagreementPct":12.1,"vacancyExact2026":0,"vacancyTotal2026":37},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2032,"high":2940,"r2_2026":1886,"modelP50":2235,"historicalReference":2069,"modelHistoryDisagreementPct":7.4,"vacancyExact2026":1,"vacancyTotal2026":37},"3AR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5734,"high":11003,"r2_2026":5973,"modelP50":6635,"historicalReference":7639,"modelHistoryDisagreementPct":15.1,"vacancyExact2026":0,"vacancyTotal2026":37},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3340,"high":4834,"r2_2026":3291,"modelP50":3675,"historicalReference":3457,"modelHistoryDisagreementPct":5.9,"vacancyExact2026":0,"vacancyTotal2026":37},"3BR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5709,"high":10698,"r2_2026":6009,"modelP50":6452,"historicalReference":7833,"modelHistoryDisagreementPct":21.4,"vacancyExact2026":0,"vacancyTotal2026":37},"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":1807,"high":2615,"r2_2026":1682,"modelP50":1988,"historicalReference":1896,"modelHistoryDisagreementPct":4.6,"vacancyExact2026":27,"vacancyTotal2026":37},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6175,"high":8364,"r2_2026":6301,"modelP50":6359,"historicalReference":6301,"modelHistoryDisagreementPct":0.9,"vacancyExact2026":0,"vacancyTotal2026":37},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5504,"high":7967,"r2_2026":5368,"modelP50":6057,"historicalReference":5782,"modelHistoryDisagreementPct":4.5,"vacancyExact2026":0,"vacancyTotal2026":37},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11211,"high":21511,"r2_2026":10799,"modelP50":12972,"historicalReference":10799,"modelHistoryDisagreementPct":16.8,"vacancyExact2026":1,"vacancyTotal2026":37}},"B.TECH IN MECHANICAL ENGINEERING":{"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":14085,"high":20385,"r2_2026":13478,"modelP50":15498,"historicalReference":13875,"modelHistoryDisagreementPct":10.5,"vacancyExact2026":0,"vacancyTotal2026":0},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9246,"high":13382,"r2_2026":9067,"modelP50":10174,"historicalReference":10518,"modelHistoryDisagreementPct":3.4,"vacancyExact2026":0,"vacancyTotal2026":0},"GM":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8060,"high":15466,"r2_2026":7991,"modelP50":9327,"historicalReference":11278,"modelHistoryDisagreementPct":20.9,"vacancyExact2026":0,"vacancyTotal2026":0},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":16890,"high":24444,"r2_2026":17180,"modelP50":18584,"historicalReference":17180,"modelHistoryDisagreementPct":7.6,"vacancyExact2026":0,"vacancyTotal2026":0}}},"BMSCE":{"ARTIFICIAL INTELLIGENCE AND DATA SCIENCE":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3645,"high":5275,"r2_2026":3308,"modelP50":4010,"historicalReference":3854,"modelHistoryDisagreementPct":3.9,"vacancyExact2026":3,"vacancyTotal2026":5},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7741,"high":10390,"r2_2026":7899,"modelP50":7899,"historicalReference":7899,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6530,"high":9451,"r2_2026":6401,"modelP50":7185,"historicalReference":6401,"modelHistoryDisagreementPct":10.9,"vacancyExact2026":0,"vacancyTotal2026":5},"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7974,"high":10909,"r2_2026":8137,"modelP50":8294,"historicalReference":8137,"modelHistoryDisagreementPct":1.9,"vacancyExact2026":0,"vacancyTotal2026":5},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6830,"high":9885,"r2_2026":6285,"modelP50":7515,"historicalReference":7491,"modelHistoryDisagreementPct":0.3,"vacancyExact2026":0,"vacancyTotal2026":5},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4684,"high":6780,"r2_2026":4246,"modelP50":5154,"historicalReference":5149,"modelHistoryDisagreementPct":0.1,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4379,"high":6337,"r2_2026":4215,"modelP50":4818,"historicalReference":5235,"modelHistoryDisagreementPct":8.7,"vacancyExact2026":0,"vacancyTotal2026":5},"STG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":16600,"high":31852,"r2_2026":15509,"modelP50":19209,"historicalReference":15509,"modelHistoryDisagreementPct":19.3,"vacancyExact2026":1,"vacancyTotal2026":5}},"ARTIFICIAL INTELLIGENCE AND MACHINE LEARNING":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3842,"high":5560,"r2_2026":3610,"modelP50":4227,"historicalReference":4176,"modelHistoryDisagreementPct":1.2,"vacancyExact2026":23,"vacancyTotal2026":31},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7172,"high":9626,"r2_2026":7318,"modelP50":7318,"historicalReference":7735,"modelHistoryDisagreementPct":5.7,"vacancyExact2026":0,"vacancyTotal2026":31},"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7248,"high":9918,"r2_2026":7396,"modelP50":7540,"historicalReference":7438,"modelHistoryDisagreementPct":1.4,"vacancyExact2026":0,"vacancyTotal2026":31},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7507,"high":10865,"r2_2026":6863,"modelP50":8260,"historicalReference":7782,"modelHistoryDisagreementPct":5.8,"vacancyExact2026":2,"vacancyTotal2026":31},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6793,"high":9377,"r2_2026":6932,"modelP50":7129,"historicalReference":7055,"modelHistoryDisagreementPct":1.0,"vacancyExact2026":0,"vacancyTotal2026":31},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4553,"high":8737,"r2_2026":4337,"modelP50":5269,"historicalReference":6312,"modelHistoryDisagreementPct":19.8,"vacancyExact2026":0,"vacancyTotal2026":31},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4536,"high":6564,"r2_2026":4391,"modelP50":4990,"historicalReference":5462,"modelHistoryDisagreementPct":9.4,"vacancyExact2026":0,"vacancyTotal2026":31},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":14753,"high":21351,"r2_2026":13587,"modelP50":16232,"historicalReference":13954,"modelHistoryDisagreementPct":14.0,"vacancyExact2026":2,"vacancyTotal2026":31}},"BIO-TECHNOLOGY":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10485,"high":15175,"r2_2026":10320,"modelP50":11537,"historicalReference":10805,"modelHistoryDisagreementPct":6.3,"vacancyExact2026":4,"vacancyTotal2026":9},"GMR":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":19019,"high":36493,"r2_2026":18311,"modelP50":22007,"historicalReference":18311,"modelHistoryDisagreementPct":16.8,"vacancyExact2026":1,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":17987,"high":26032,"r2_2026":17981,"modelP50":19791,"historicalReference":17981,"modelHistoryDisagreementPct":9.1,"vacancyExact2026":0,"vacancyTotal2026":9},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":20812,"high":28524,"r2_2026":21237,"modelP50":21685,"historicalReference":21237,"modelHistoryDisagreementPct":2.1,"vacancyExact2026":0,"vacancyTotal2026":9},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":12982,"high":18789,"r2_2026":13162,"modelP50":14284,"historicalReference":13162,"modelHistoryDisagreementPct":7.9,"vacancyExact2026":0,"vacancyTotal2026":9}},"CHEMICAL ENGINEERING":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":12686,"high":18360,"r2_2026":12195,"modelP50":13958,"historicalReference":13904,"modelHistoryDisagreementPct":0.4,"vacancyExact2026":0,"vacancyTotal2026":4},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":38735,"high":51991,"r2_2026":39526,"modelP50":39526,"historicalReference":39526,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":4},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":25656,"high":36909,"r2_2026":26180,"modelP50":28060,"historicalReference":31676,"modelHistoryDisagreementPct":12.9,"vacancyExact2026":0,"vacancyTotal2026":4},"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":32128,"high":61649,"r2_2026":29253,"modelP50":37177,"historicalReference":29345,"modelHistoryDisagreementPct":21.1,"vacancyExact2026":1,"vacancyTotal2026":4},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":30840,"high":44634,"r2_2026":30263,"modelP50":33933,"historicalReference":37996,"modelHistoryDisagreementPct":12.0,"vacancyExact2026":0,"vacancyTotal2026":4},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":18850,"high":36169,"r2_2026":17973,"modelP50":21812,"historicalReference":17973,"modelHistoryDisagreementPct":17.6,"vacancyExact2026":1,"vacancyTotal2026":4}},"CIVIL ENGINEERING":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":29844,"high":43193,"r2_2026":28829,"modelP50":32837,"historicalReference":28829,"modelHistoryDisagreementPct":12.2,"vacancyExact2026":3,"vacancyTotal2026":5},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":36774,"high":52117,"r2_2026":37524,"modelP50":39622,"historicalReference":37524,"modelHistoryDisagreementPct":5.3,"vacancyExact2026":0,"vacancyTotal2026":5},"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":37285,"high":51391,"r2_2026":38046,"modelP50":39069,"historicalReference":41799,"modelHistoryDisagreementPct":7.0,"vacancyExact2026":0,"vacancyTotal2026":5},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":31442,"high":45506,"r2_2026":31403,"modelP50":34596,"historicalReference":35411,"modelHistoryDisagreementPct":2.4,"vacancyExact2026":0,"vacancyTotal2026":5},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":30663,"high":41577,"r2_2026":31289,"modelP50":31609,"historicalReference":31289,"modelHistoryDisagreementPct":1.0,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":30154,"high":42927,"r2_2026":30769,"modelP50":32635,"historicalReference":30769,"modelHistoryDisagreementPct":5.7,"vacancyExact2026":0,"vacancyTotal2026":5}},"COMPUTER SCIENCE AND BUSINESS SYSTEMS":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4358,"high":6307,"r2_2026":3912,"modelP50":4795,"historicalReference":5112,"modelHistoryDisagreementPct":6.6,"vacancyExact2026":1,"vacancyTotal2026":5},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":11934,"high":16019,"r2_2026":12178,"modelP50":12178,"historicalReference":12178,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":5},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7132,"high":10322,"r2_2026":7006,"modelP50":7847,"historicalReference":9003,"modelHistoryDisagreementPct":14.7,"vacancyExact2026":0,"vacancyTotal2026":5},"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8637,"high":11793,"r2_2026":8813,"modelP50":8965,"historicalReference":8813,"modelHistoryDisagreementPct":1.7,"vacancyExact2026":0,"vacancyTotal2026":5},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":9189,"high":13299,"r2_2026":8290,"modelP50":10110,"historicalReference":10878,"modelHistoryDisagreementPct":7.6,"vacancyExact2026":1,"vacancyTotal2026":5},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10477,"high":18546,"r2_2026":11028,"modelP50":11184,"historicalReference":12960,"modelHistoryDisagreementPct":15.9,"vacancyExact2026":0,"vacancyTotal2026":5},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4905,"high":7099,"r2_2026":4387,"modelP50":5397,"historicalReference":5751,"modelHistoryDisagreementPct":6.6,"vacancyExact2026":0,"vacancyTotal2026":5},"3BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4295,"high":8241,"r2_2026":4312,"modelP50":4970,"historicalReference":5775,"modelHistoryDisagreementPct":16.2,"vacancyExact2026":0,"vacancyTotal2026":5}},"CS & ENGG(IOT CYBER SECURITY & BLOCKCHAIN)":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3516,"high":5089,"r2_2026":3076,"modelP50":3869,"historicalReference":4048,"modelHistoryDisagreementPct":4.6,"vacancyExact2026":5,"vacancyTotal2026":9},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5607,"high":8115,"r2_2026":5352,"modelP50":6169,"historicalReference":5352,"modelHistoryDisagreementPct":13.2,"vacancyExact2026":0,"vacancyTotal2026":9},"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7852,"high":11014,"r2_2026":8012,"modelP50":8374,"historicalReference":9123,"modelHistoryDisagreementPct":8.9,"vacancyExact2026":0,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7804,"high":11295,"r2_2026":7030,"modelP50":8587,"historicalReference":9594,"modelHistoryDisagreementPct":11.7,"vacancyExact2026":0,"vacancyTotal2026":9},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8187,"high":14779,"r2_2026":8618,"modelP50":8912,"historicalReference":11584,"modelHistoryDisagreementPct":30.0,"vacancyExact2026":0,"vacancyTotal2026":9},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4601,"high":6659,"r2_2026":4151,"modelP50":5063,"historicalReference":5807,"modelHistoryDisagreementPct":14.7,"vacancyExact2026":0,"vacancyTotal2026":9},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4840,"high":7005,"r2_2026":4248,"modelP50":5325,"historicalReference":5514,"modelHistoryDisagreementPct":3.5,"vacancyExact2026":1,"vacancyTotal2026":9}},"COMPUTER SCIENCE AND ENGINEERING":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2993,"high":4331,"r2_2026":2856,"modelP50":3293,"historicalReference":3190,"modelHistoryDisagreementPct":3.1,"vacancyExact2026":65,"vacancyTotal2026":99},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":8115,"high":10976,"r2_2026":8281,"modelP50":8344,"historicalReference":8341,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":99},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5711,"high":8265,"r2_2026":5208,"modelP50":6284,"historicalReference":6403,"modelHistoryDisagreementPct":1.9,"vacancyExact2026":1,"vacancyTotal2026":99},"1G":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7085,"high":10254,"r2_2026":6654,"modelP50":7796,"historicalReference":6905,"modelHistoryDisagreementPct":11.4,"vacancyExact2026":1,"vacancyTotal2026":99},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6311,"high":9134,"r2_2026":5802,"modelP50":6944,"historicalReference":7053,"modelHistoryDisagreementPct":1.6,"vacancyExact2026":4,"vacancyTotal2026":99},"2BG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7806,"high":14103,"r2_2026":8217,"modelP50":8505,"historicalReference":10081,"modelHistoryDisagreementPct":18.5,"vacancyExact2026":0,"vacancyTotal2026":99},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3949,"high":7578,"r2_2026":3725,"modelP50":4570,"historicalReference":5491,"modelHistoryDisagreementPct":20.1,"vacancyExact2026":2,"vacancyTotal2026":99},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4314,"high":6244,"r2_2026":3951,"modelP50":4747,"historicalReference":4582,"modelHistoryDisagreementPct":3.5,"vacancyExact2026":2,"vacancyTotal2026":99},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":14256,"high":20633,"r2_2026":13233,"modelP50":15686,"historicalReference":14468,"modelHistoryDisagreementPct":7.8,"vacancyExact2026":3,"vacancyTotal2026":99}},"COMPUTER SCIENCE AND ENGINEERING (DATA SCIENCE)":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3560,"high":5153,"r2_2026":3233,"modelP50":3917,"historicalReference":3802,"modelHistoryDisagreementPct":3.0,"vacancyExact2026":7,"vacancyTotal2026":9},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7794,"high":10461,"r2_2026":7953,"modelP50":7953,"historicalReference":7953,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":9},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5949,"high":8609,"r2_2026":5741,"modelP50":6545,"historicalReference":6184,"modelHistoryDisagreementPct":5.5,"vacancyExact2026":0,"vacancyTotal2026":9},"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":6306,"high":11341,"r2_2026":6638,"modelP50":6839,"historicalReference":7962,"modelHistoryDisagreementPct":16.4,"vacancyExact2026":0,"vacancyTotal2026":9},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7107,"high":10287,"r2_2026":6457,"modelP50":7820,"historicalReference":8226,"modelHistoryDisagreementPct":5.2,"vacancyExact2026":0,"vacancyTotal2026":9},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5793,"high":8161,"r2_2026":5911,"modelP50":6204,"historicalReference":5911,"modelHistoryDisagreementPct":4.7,"vacancyExact2026":0,"vacancyTotal2026":9},"3AG":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":3573,"high":6855,"r2_2026":3373,"modelP50":4134,"historicalReference":4933,"modelHistoryDisagreementPct":19.3,"vacancyExact2026":0,"vacancyTotal2026":9},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4216,"high":6102,"r2_2026":4035,"modelP50":4639,"historicalReference":5167,"modelHistoryDisagreementPct":11.4,"vacancyExact2026":0,"vacancyTotal2026":9},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13955,"high":19114,"r2_2026":14240,"modelP50":14531,"historicalReference":14240,"modelHistoryDisagreementPct":2.0,"vacancyExact2026":0,"vacancyTotal2026":9}},"ELECTRONICS AND COMMUNICATION ENGG":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":2796,"high":4046,"r2_2026":2641,"modelP50":3076,"historicalReference":2877,"modelHistoryDisagreementPct":6.5,"vacancyExact2026":15,"vacancyTotal2026":23},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10230,"high":13731,"r2_2026":10439,"modelP50":10439,"historicalReference":10439,"modelHistoryDisagreementPct":0.0,"vacancyExact2026":0,"vacancyTotal2026":23},"GMR":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":5827,"high":8433,"r2_2026":5744,"modelP50":6411,"historicalReference":6115,"modelHistoryDisagreementPct":4.6,"vacancyExact2026":0,"vacancyTotal2026":23},"1G":{"confidence":"Medium","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7704,"high":13769,"r2_2026":8110,"modelP50":8303,"historicalReference":9812,"modelHistoryDisagreementPct":18.2,"vacancyExact2026":0,"vacancyTotal2026":23},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":7512,"high":10872,"r2_2026":6973,"modelP50":8266,"historicalReference":7478,"modelHistoryDisagreementPct":9.5,"vacancyExact2026":2,"vacancyTotal2026":23},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":10254,"high":13770,"r2_2026":10463,"modelP50":10469,"historicalReference":10463,"modelHistoryDisagreementPct":0.1,"vacancyExact2026":0,"vacancyTotal2026":23},"3AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4527,"high":6552,"r2_2026":4204,"modelP50":4981,"historicalReference":5429,"modelHistoryDisagreementPct":9.0,"vacancyExact2026":0,"vacancyTotal2026":23},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":4242,"high":6140,"r2_2026":3856,"modelP50":4668,"historicalReference":4246,"modelHistoryDisagreementPct":9.0,"vacancyExact2026":1,"vacancyTotal2026":23},"STG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":13994,"high":18978,"r2_2026":14280,"modelP50":14428,"historicalReference":14755,"modelHistoryDisagreementPct":2.3,"vacancyExact2026":0,"vacancyTotal2026":23}},"MECHANICAL ENGINEERING":{"GM":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":12260,"high":17743,"r2_2026":10965,"modelP50":13489,"historicalReference":15508,"modelHistoryDisagreementPct":15.0,"vacancyExact2026":1,"vacancyTotal2026":2},"GMK":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":45817,"high":66311,"r2_2026":42130,"modelP50":50412,"historicalReference":46674,"modelHistoryDisagreementPct":7.4,"vacancyExact2026":1,"vacancyTotal2026":2},"2AG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":17895,"high":25900,"r2_2026":17307,"modelP50":19690,"historicalReference":18078,"modelHistoryDisagreementPct":8.2,"vacancyExact2026":0,"vacancyTotal2026":2},"2BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":26706,"high":35910,"r2_2026":27251,"modelP50":27301,"historicalReference":27251,"modelHistoryDisagreementPct":0.2,"vacancyExact2026":0,"vacancyTotal2026":2},"3BG":{"confidence":"High","status":"OFFICIAL_DATA_MODEL","mode":"accuracy_max_v3","low":14438,"high":20896,"r2_2026":14534,"modelP50":15886,"historicalReference":17523,"modelHistoryDisagreementPct":10.3,"vacancyExact2026":0,"vacancyTotal2026":2}}}};

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
  S1G: "S1G — SCA General", S1K: "S1K — SCA Kannada", S1R: "S1R — SCA Rural",
  S2G: "S2G — SCB General", S2K: "S2K — SCB Kannada", S2R: "S2R — SCB Rural",
  S3G: "S3G — SCC (80%) General", S3K: "S3K — SCC (80%) Kannada", S3R: "S3R — SCC (80%) Rural",
  S4G: "S4G — SCC (20%) General", S4K: "S4K — SCC (20%) Kannada", S4R: "S4R — SCC (20%) Rural",
  STG: "STG — Scheduled Tribe General", STK: "STK — Scheduled Tribe Kannada", STR: "STR — Scheduled Tribe Rural",
};

function verdictFor(margin) {
  if (margin >= 15) return { tier: "Very Strong Chance", key: "strong", prob: Math.min(99, 90 + (margin - 15) * 0.3) };
  if (margin >= 5) return { tier: "Realistic Chance", key: "realistic", prob: 70 + ((margin - 5) / 10) * 24 };
  if (margin >= -5) return { tier: "Borderline", key: "borderline", prob: 40 + ((margin + 5) / 10) * 20 };
  if (margin >= -20) return { tier: "Slim Chance", key: "slim", prob: 10 + ((margin + 20) / 15) * 25 };
  return { tier: "Not Possible", key: "impossible", prob: Math.max(0.5, 5 + margin / 10) };
}

function verdictForPrediction(rank, cutoff, meta) {
  const low = meta?.low;
  const high = meta?.high;

  if (Number.isFinite(low) && Number.isFinite(high)) {
    if (rank <= low) return { tier: "Very Strong Chance", key: "strong" };
    if (rank <= cutoff) return { tier: "Favorable, Not Certain", key: "realistic" };
    if (rank <= high) return { tier: "Too Close to Call", key: "borderline" };
    if (rank <= high * 1.05) return { tier: "Outside Likely Range", key: "slim" };
    return { tier: "Unlikely", key: "impossible" };
  }

  return verdictFor(((cutoff - rank) / cutoff) * 100);
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
  const meta = PREDICTION_META[college]?.[branch]?.[category] || {};
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
          No usable Round 3 prediction is available for <b>{category}</b> in this branch.
        </div>
      </div>
    );
  }

  const margin = ((cutoff - rank) / cutoff) * 100;
  const v = verdictForPrediction(rank, cutoff, meta);
  const s = VERDICT_STYLE[v.key];
  const clamped = Math.max(-40, Math.min(40, margin));
  const gaugePct = ((clamped + 40) / 80) * 100;
  const hasRange = Number.isFinite(meta.low) && Number.isFinite(meta.high);
  const isNewSC = meta.mode === "new_sc";
  const confidence = meta.confidence || "Low";

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
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: "#2a2620" }}>
            <AnimatedNumber value={rank} />
          </div>
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 20, color: "#b3ab94", paddingBottom: 4 }}>vs</div>
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>
            Model R3 Center ({category})
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 600, color: "#2a2620" }}>
            <AnimatedNumber value={cutoff} />
          </div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: 1.2, color: "#8a8472", textTransform: "uppercase", marginBottom: 2 }}>Margin vs P50</div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 18, fontWeight: 600, color: s.accent }}>
            {margin >= 0 ? "+" : ""}{margin.toFixed(1)}%
          </div>
        </div>
      </div>

      {hasRange && (
        <div style={{
          display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center",
          margin: "0 0 16px", padding: "10px 12px", borderRadius: 4,
          background: "rgba(255,255,255,0.48)", border: `1px solid ${s.border}22`,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: "#5b5648",
        }}>
          <span>Back-tested range: <b>{fmt(meta.low)} – {fmt(meta.high)}</b></span>
          <span>Model confidence: <b>{confidence}</b></span>
          {meta.action === "MANUAL_OVERRIDE" && <span>Expert override applied</span>}
        </div>
      )}

      {isNewSC && (
        <div style={{
          margin: "0 0 16px", padding: "9px 11px", background: "#f6f1df",
          border: "1px solid #d9c98f", borderRadius: 4,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, lineHeight: 1.5, color: "#725f24",
        }}>
          Low-confidence 2026 SC-subcategory estimate: there is no direct like-for-like 2025 S1/S2/S3/S4 history.
        </div>
      )}

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
        <span>WORSE THAN EXPECTED</span>
        <span>EXPECTED P50</span>
        <span>BETTER THAN EXPECTED</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <div className="tfc-badge-anim" style={{
          display: "inline-block", padding: "6px 14px", borderRadius: 3, background: s.accent,
          color: "#fff", fontFamily: "'Source Serif Pro', Georgia, serif", fontWeight: 700, fontSize: 15,
        }}>
          {v.tier}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: s.text }}>
          {hasRange
            ? <>Range-aware prediction · <b>{confidence}</b> model confidence</>
            : <>Directional estimate · <b>{confidence}</b> confidence</>}
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
    const curMeta = PREDICTION_META[resultCollege]?.[resultBranch]?.[resultCategory] || {};
    const curVerdict = cur != null
      ? verdictForPrediction(resultRank, cur, curMeta).key
      : null;

    if (curVerdict !== "impossible" && curVerdict !== "slim" && curVerdict !== null) return [];

    const opts = [];
    for (const b of resultBranches) {
      if (b === resultBranch) continue;
      const c = RAW_DATA[resultCollege][b][resultCategory];
      if (c == null) continue;

      const candidateMeta = PREDICTION_META[resultCollege]?.[b]?.[resultCategory] || {};
      const vt = verdictForPrediction(resultRank, c, candidateMeta);
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

    const meta = PREDICTION_META[submitted.college]?.[submitted.branch]?.[submitted.category] || {};
    return verdictForPrediction(submitted.rank, cutoff, meta).key;
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
            Accuracy-first Round 3 model using official KEA history + 2026 vacancies — only publishable predictions are shown
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
          Accuracy-Max v3 is trained only on matched official KEA 2025 Round-2, Round-3 and vacancy observations, then applied to official 2026 Round-2 and Round-3 vacancy data. Grouped back-testing across 472 matched 2025 observations produced a median absolute percentage error of about 5.38% and a 90th-percentile error of about 27.79%. A category is published only when the model and its same College+Branch+Category 2025 movement agree within 30%; weak or conflicting categories are withheld instead of forcing a cutoff. The displayed value is the model center and the range reflects back-tested uncertainty. These are predictions, not official KEA cutoffs.
        </div>
      </div>
    </div>
  );
}
