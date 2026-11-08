{
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -12944,
        8336
      ],
      "id": "8543d8b4-477b-4e99-8bc8-0bfb8596bba2",
      "name": "🎱🍁#DARKSIDEMARKETING2"
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "getAll",
        "tableId": "🪐ANDROMEDA_xXx_SENT",
        "returnAll": true,
        "filters": {
          "conditions": []
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -14736,
        7904
      ],
      "id": "3783d165-d2a7-413f-8085-2ab8463bde2a",
      "name": "🪐ANDROMEDA_xXx_SENT1",
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "minutes",
              "minutesInterval": 3
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.3,
      "position": [
        -14960,
        7904
      ],
      "id": "c8fce902-f6ea-45c4-85c2-61da58b3f30b",
      "name": "Schedule Trigger"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "b571e39b-5b2e-4db2-99b7-47cadc0c08c6",
                    "leftValue": "={{ $json.source_table }}",
                    "rightValue": "🗝️HERMES_ARCHIVE",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🗝️"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.source_table }}",
                    "rightValue": "🌀SINGULARITY_xXx_EXCHANGE",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "id": "3fc0a29e-1342-4dc3-bbf8-42480605735d"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🌀"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -13616,
        7552
      ],
      "id": "8cd4e3a7-fb0c-4852-bbc7-49bc192c0d71",
      "name": "Switch"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -13168,
        7552
      ],
      "id": "574036b2-c9bd-45c3-9d4b-d24fa959a596",
      "name": "🎱🍁#DARKSIDEMARKETING3"
    },
    {
      "parameters": {
        "jsCode": "function value(r, k) {\n  const v = r?.[k];\n  return v === undefined || v === null ? \"\" : String(v).trim();\n}\n\nfunction firstExisting(r, keys) {\n  for (const k of keys) {\n    const v = value(r, k);\n    if (v !== \"\") return v;\n  }\n  return \"\";\n}\n\nfunction escapeHtml(v) {\n  return String(v ?? \"\")\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\");\n}\n\nfunction htmlToPlainText(value) {\n  return String(value ?? \"\")\n    .replace(/<br\\s*\\/?\\s*>/gi, \"\\n\")\n    .replace(/<\\/(?:p|div|li|tr|h[1-6])\\s*>/gi, \"\\n\")\n    .replace(/<[^>]*>/g, \"\")\n    .replace(/&nbsp;/gi, \" \")\n    .replace(/&#39;|&apos;/gi, \"'\")\n    .replace(/&quot;/gi, '\"')\n    .replace(/&lt;/gi, \"<\")\n    .replace(/&gt;/gi, \">\")\n    .replace(/&amp;/gi, \"&\")\n    .replace(/&#(\\d+);/g, (_, n) => String.fromCodePoint(Number(n)))\n    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))\n    .replace(/\\r\\n?/g, \"\\n\")\n    .replace(/[ \\t]+\\n/g, \"\\n\")\n    .replace(/\\n{3,}/g, \"\\n\\n\")\n    .trim();\n}\n\nconst inputItems = $input.all();\n\nreturn inputItems.map((item) => {\n  const row = item?.json ?? {};\n\n  // 1. ดึงข้อความบิลเดิม (ที่มีบล็อก Change Audit ครบถ้วนแล้ว) มาเป็นตัวตั้งต้น\n  let telegramMsg = firstExisting(row, [\n    'telegram_message',\n    'telegram_main_bill',\n    'telegram_message_for_send_final',\n    'raw_text'\n  ]);\n\n  // 2. ดึง stock_notice มาแต่งHTMLให้หล่อเหมือนฝั่งบิลเดี่ยว\n  const rawStockNotice = firstExisting(row, ['stock_notice', 'dynamic_header', 'header_notice']);\n  const formattedNotice = rawStockNotice ? `<b>${escapeHtml(rawStockNotice)}</b>` : \"\";\n\n  // 3. เช็คว่าในข้อความมี stock_notice ตัวนี้แปะอยู่แล้วหรือยัง (ป้องกันการเบิ้ลซ้ำ)\n  const hasNoticeAlready = formattedNotice && telegramMsg.includes(rawStockNotice);\n\n  // 4. ถ้ามี stock_notice และยังไม่เคยถูกแปะ ให้เอามา \"เสียบบนสุด\" เหนือเวลาสั่งซื้อ\n  if (formattedNotice && !hasNoticeAlready) {\n    telegramMsg = `${formattedNotice}\\n${telegramMsg}`;\n  }\n\n  // สร้างฟิลด์เว็บแยกจาก HTML สำหรับ Telegram; ฟิลด์ส่งกลุ่มคงเดิม\n  const telegramChangeAlert = firstExisting(row, ['telegram_change_alert']);\n  const telegramMessageWeb = htmlToPlainText(telegramMsg);\n  const telegramChangeAlertWeb = htmlToPlainText(telegramChangeAlert);\n\n  return {\n    json: {\n      ...row,\n      // อัปเดตฟิลด์ข้อความส่งออกให้เป็นตัวที่ใส่หัวแจ้งเตือนสต็อกเรียบร้อยแล้ว\n      telegram_message: telegramMsg,\n      telegram_main_bill: telegramMsg,\n      telegram_message_for_send_final: telegramMsg,\n      telegram_message_web: telegramMessageWeb,\n      telegram_change_alert_web: telegramChangeAlertWeb,\n      audit_header_inject_status: formattedNotice ? (hasNoticeAlready ? 'ALREADY_EXISTS' : 'INJECTED_SUCCESS') : 'NO_NOTICE'\n    }\n  };\n});"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -14064,
        7904
      ],
      "id": "4351e625-9e15-4689-a0a5-0b4c6e4736e1",
      "name": "BILL HEADER INJECTOR1"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "43e7ccd4-eff3-429b-bdfb-bcdfc8fb5c8c",
                    "leftValue": "={{ $json.bb_express_send_route }}",
                    "rightValue": "⚪",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "⚪"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "3f45f9a3-ab1a-4291-bcca-95a9019e3d1d",
                    "leftValue": "={{ $json.bb_express_send_route }}",
                    "rightValue": "🟦",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🟦"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "5ec59028-1923-4c09-8d97-123e567a9672",
                    "leftValue": "={{ $json.bb_express_send_route }}",
                    "rightValue": "🟨",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🟨 "
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "bc264af8-5ebc-46ca-bfec-55687302d37f",
                    "leftValue": "={{ $json.bb_express_send_route }}",
                    "rightValue": "🟠",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🟠"
            }
          ]
        },
        "options": {
          "fallbackOutput": "none"
        }
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -13616,
        8208
      ],
      "id": "e3cc8ba5-85e8-4370-b314-f6f16e691646",
      "name": "⭐⭐👑⭐⭐1"
    },
    {
      "parameters": {
        "jsCode": "// n8n Code node — Mode: Run Once for All Items\n// 🛡️ THE GOD GATEKEEPER : DK DRAKSIDE - SPACE VAULT EDITION (TIME CHECK ONLY)\n\nconst START_DATETIME_BKK = \"2026-10-29 00:00:00\";\nconst END_DATETIME_BKK   = \"2028-12-30 00:00:01\";\n\nconst clean = (value) => String(value ?? \"\").trim().replace(/\\s+/g, \" \");\n\nfunction parseDateTimeMs(value) {\n  const s = clean(value);\n  if (!s) return null;\n  const parsed = Date.parse(s);\n  return Number.isFinite(parsed) ? parsed : null;\n}\n\n// 1. คำนวณขอบเขตเวลาวิกฤตฝั่งเซิร์ฟเวอร์อิงเวลาไทยปัจจุบัน (UTC+7)\nconst now = new Date();\nconst nowUtcMs = now.getTime();\nconst thaiNow = new Date(nowUtcMs + (7 * 60 * 60 * 1000));\n\n// ⏰ ตั้งเวลา Cutoff รอบแพ็กของ \"บ่ายสองโมงตรงของเมื่อวาน\" (13:45 UTC ตามสูตรดั้งเดิม)\nconst yesterdayCutoff = new Date(thaiNow);\nyesterdayCutoff.setUTCDate(yesterdayCutoff.getUTCDate() - 3); \nyesterdayCutoff.setUTCHours(13, 45, 0, 4); \nconst minAllowedTimeMs = yesterdayCutoff.getTime() - (7 * 60 * 60 * 1000);\n\n// 🚨 เกณฑ์เหล็กป้องกันระบบสะดุด: ถอยหลัง 24 ชม. ตรงๆ นับจากวินาทีนี้เป๊ะ\nconst absolute24hAgoMs = nowUtcMs - (24 * 60 * 60 * 1000);\nconst maxAllowedTimeMs = nowUtcMs + (12 * 60 * 60 * 1000);\n\n// ฟังก์ชันแกะเวลาแชทไทย \"30/10/69 15:55:33\" ออกมาเป็น Timestamp สากล\nfunction parseThaiDateTime(raw) {\n  if (!raw) return null;\n  try {\n    const [datePart, timePart] = String(raw).trim().split(\" \");\n    const [d, m, y] = datePart.split(\"/\");\n    \n    let year = parseInt(y);\n    if (year < 100) year += 2500; // แปลง 69 -> 2569\n    year -= 543; // แปลง พ.ศ. -> ค.ศ.\n    \n    const [hour, minute, second] = (timePart || \"00:00:00\").split(\":\").map(Number);\n    return new Date(Date.UTC(year, parseInt(m) - 1, parseInt(d), hour - 7, minute, second)).getTime();\n  } catch {\n    return null;\n  }\n}\n\nreturn $input.all().flatMap(({ json: row = {} }) => {\n  const orderTimeDisplay = clean(row.order_time_display || \"-\");\n\n  // 🎯 สวิตช์เช็กเวลาหลักจาก order_time_display ตรงๆ ตัวเดียวจบ\n  const rawChatTime = orderTimeDisplay;\n  const chatTimestamp = parseThaiDateTime(rawChatTime);\n\n  // 🛠️ ⚡ *เช็กเกณฑ์เวลาแบบ 2 ทางแยกคัดป้าย (ใช่ กับ ไม่ใช่)*\n  let bkk_cutoff_route = \"BLOCK_TG_EXPIRED\"; // ตั้งค่าเริ่มต้นเป็น \"ไม่ใช่\" (BLOCK)\n  let isWithin24h = false;\n  let chatAgeHours = 0;\n\n  if (chatTimestamp) {\n    const diffInMs = nowUtcMs - chatTimestamp;\n    chatAgeHours = diffInMs / (1000 * 60 * 60);\n\n    // 🎯 เงื่อนไข \"ใช่\" (ผ่านเกณฑ์เวลาทั้งหมด) -> ปรับป้ายเป็น ALLOW_TG_SEND\n    if (chatTimestamp >= absolute24hAgoMs && chatTimestamp >= minAllowedTimeMs && chatTimestamp <= maxAllowedTimeMs) {\n      bkk_cutoff_route = \"ALLOW_TG_SEND\"; \n      isWithin24h = true;\n    }\n  }\n\n  // ส่งผลลัพธ์ออกสู่สายพานปลายทางแบบคืนค่าแถวข้อมูลเดิมกลับไปพร้อมประทับป้ายเวลา\n  return [\n    {\n      json: {\n        ...row,\n        order_time_display: orderTimeDisplay,\n        customerMessageTimeTh: rawChatTime,\n        // 🔀 ตราป้ายสเตตัส 2 ทางแยกเคลียร์คัตตามบรีฟ\n        bkk_cutoff_route: bkk_cutoff_route,\n        send_facebook_route: bkk_cutoff_route,\n        sendFacebookRoute: bkk_cutoff_route,\n        send_telegram_route: bkk_cutoff_route, \n        is_24h_window_valid: isWithin24h,\n        customer_chat_age_hours: chatAgeHours,\n      },\n    },\n  ];\n});\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -14512,
        7904
      ],
      "id": "3158150d-bf76-41f5-8499-2a0652e5c9b8",
      "name": "🧿END_DATETIME_BKK2"
    },
    {
      "parameters": {
        "batchSize": 3,
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        -13392,
        7904
      ],
      "id": "d0ce825e-3a5c-4cbf-9359-6f0b9be79be0",
      "name": "Loop Over Items1"
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "id": "b571e39b-5b2e-4db2-99b7-47cadc0c08c6",
                    "leftValue": "={{ $json.bkk_cutoff_route }}",
                    "rightValue": "BLOCK_TG_EXPIRED",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🚫"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 3
                },
                "conditions": [
                  {
                    "leftValue": "={{ $json.bkk_cutoff_route }}",
                    "rightValue": "ALLOW_TG_SEND",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "id": "3fc0a29e-1342-4dc3-bbf8-42480605735d"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "🆕"
            }
          ]
        },
        "options": {
          "fallbackOutput": "none"
        }
      },
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3.4,
      "position": [
        -13840,
        7904
      ],
      "id": "98c390ae-b8ce-42bd-9a8d-98a9b25a8e30",
      "name": "⭐⭐🍁⭐⭐1"
    },
    {
      "parameters": {
        "chatId": "-1004343164176",
        "text": "={{ $json.telegram_message }}",
        "additionalFields": {
          "appendAttribution": false,
          "parse_mode": "HTML"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        -13392,
        8528
      ],
      "id": "a0113992-d64d-4e84-bcba-02c5b1a8deb1",
      "name": "🔸 PARADOX_xXx_EXCHANGE1",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "byg0vHxo5ZIap74c",
          "name": "เทส"
        }
      }
    },
    {
      "parameters": {
        "chatId": "-1003546625293",
        "text": "={{ $json.telegram_message }}",
        "additionalFields": {
          "appendAttribution": false,
          "parse_mode": "HTML"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        -13392,
        8336
      ],
      "id": "c956518c-1793-416d-98ad-2f1cbdc64c7e",
      "name": "🌟GENESIS_xXx_HISTORY3",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "e60ukliyR12WX6Pe",
          "name": "ฺฺBBBBB"
        }
      }
    },
    {
      "parameters": {
        "chatId": "-1003546625293",
        "text": "={{ $json.telegram_message }}",
        "additionalFields": {
          "appendAttribution": false,
          "parse_mode": "HTML"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        -13392,
        8144
      ],
      "id": "a051d721-a5d2-4957-b1f2-ba15a8990713",
      "name": "🌟GENESIS_xXx_HISTORY4",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "e60ukliyR12WX6Pe",
          "name": "ฺฺBBBBB"
        }
      }
    },
    {
      "parameters": {
        "chatId": "-1003546625293",
        "text": "={{ $json.telegram_message }}",
        "additionalFields": {
          "appendAttribution": false,
          "parse_mode": "HTML"
        }
      },
      "type": "n8n-nodes-base.telegram",
      "typeVersion": 1.2,
      "position": [
        -13168,
        7840
      ],
      "id": "0bea7d56-c538-4bf1-b46a-f1bf4ba632f0",
      "name": "🌟GENESIS_xXx_HISTORY5",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "e60ukliyR12WX6Pe",
          "name": "ฺฺBBBBB"
        }
      }
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -12720,
        7904
      ],
      "id": "37f8e8f3-3bb3-4b97-b3be-d799becb409e",
      "name": "Wait1",
      "webhookId": "39166bf4-cbfb-4e70-80f9-35db4e024436"
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "update",
        "tableId": "🗝️HERMES_ARCHIVE",
        "filters": {
          "conditions": [
            {
              "keyName": "upsert_key",
              "condition": "eq",
              "keyValue": "={{ $('⭐⭐👑⭐⭐1').item.json.upsert_key }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "telegram_sent",
              "fieldValue": "true"
            },
            {
              "fieldId": "telegram_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "delivery_state",
              "fieldValue": "😈 Red Devil (Ghost)"
            },
            {
              "fieldId": "sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "delivery_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            },
            {
              "fieldId": "chat_link_key",
              "fieldValue": "={{ $('⭐⭐👑⭐⭐1').item.json.chat_link_key }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -13168,
        8144
      ],
      "id": "21a4315d-2791-43fb-bf33-1c54b70098d2",
      "name": "🗝️HERMES_ARCHIVE6",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "update",
        "tableId": "🗝️HERMES_ARCHIVE",
        "filters": {
          "conditions": [
            {
              "keyName": "upsert_key",
              "condition": "eq",
              "keyValue": "={{ $('⭐⭐👑⭐⭐1').item.json.upsert_key }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "telegram_sent",
              "fieldValue": "true"
            },
            {
              "fieldId": "telegram_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "delivery_state",
              "fieldValue": "😈 Red Devil (Ghost)"
            },
            {
              "fieldId": "sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "delivery_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            },
            {
              "fieldId": "chat_link_key",
              "fieldValue": "={{ $('⭐⭐👑⭐⭐1').item.json.chat_link_key }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -12944,
        7840
      ],
      "id": "0133ed0d-5762-497e-914a-4cd06c0812cf",
      "name": "🗝️HERMES_ARCHIVE9",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "update",
        "tableId": "🗝️HERMES_ARCHIVE",
        "filters": {
          "conditions": [
            {
              "keyName": "upsert_key",
              "condition": "eq",
              "keyValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "telegram_sent",
              "fieldValue": "true"
            },
            {
              "fieldId": "telegram_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "delivery_state",
              "fieldValue": "😈 Red Devil (Ghost)"
            },
            {
              "fieldId": "sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "delivery_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            },
            {
              "fieldId": "chat_link_key",
              "fieldValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.chat_link_key }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -13392,
        7456
      ],
      "id": "51d924d1-1005-470e-a689-7dc5d573e148",
      "name": "🗝️HERMES_ARCHIVE11",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "update",
        "tableId": "🌀SINGULARITY_xXx_EXCHANGE",
        "filters": {
          "conditions": [
            {
              "keyName": "upsert_key",
              "condition": "eq",
              "keyValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "telegram_sent",
              "fieldValue": "true"
            },
            {
              "fieldId": "telegram_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "delivery_state",
              "fieldValue": "😈 Red Devil (Ghost)"
            },
            {
              "fieldId": "sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "delivery_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            },
            {
              "fieldId": "chat_link_key",
              "fieldValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -13392,
        7648
      ],
      "id": "c028e752-1a8c-462c-99f3-424c6be032f3",
      "name": "🌀SINGULARITY_xXx_EXCHANGE7",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "update",
        "tableId": "🌀SINGULARITY_xXx_EXCHANGE",
        "filters": {
          "conditions": [
            {
              "keyName": "upsert_key",
              "condition": "eq",
              "keyValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "telegram_sent",
              "fieldValue": "true"
            },
            {
              "fieldId": "telegram_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "delivery_state",
              "fieldValue": "😈 Red Devil (Ghost)"
            },
            {
              "fieldId": "sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "delivery_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            },
            {
              "fieldId": "chat_link_key",
              "fieldValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -13168,
        8336
      ],
      "id": "c0da7aa3-a8a5-445d-8dc1-e443ef916363",
      "name": "🌀SINGULARITY_xXx_EXCHANGE9",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "useCustomSchema": true,
        "operation": "update",
        "tableId": "🌀SINGULARITY_xXx_EXCHANGE",
        "filters": {
          "conditions": [
            {
              "keyName": "upsert_key",
              "condition": "eq",
              "keyValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        },
        "fieldsUi": {
          "fieldValues": [
            {
              "fieldId": "telegram_sent",
              "fieldValue": "true"
            },
            {
              "fieldId": "telegram_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "delivery_state",
              "fieldValue": "😈 Red Devil (Ghost)"
            },
            {
              "fieldId": "sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "delivery_status",
              "fieldValue": "🔥SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            },
            {
              "fieldId": "chat_link_key",
              "fieldValue": "={{ $('⭐⭐🍁⭐⭐1').item.json.upsert_key }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -13168,
        8528
      ],
      "id": "a2b9c882-769c-477c-9afe-d2c080f691b3",
      "name": "🌀SINGULARITY_xXx_EXCHANGE10",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "fUL1nUoNWuBjchp1",
          "name": "⚡WARP_DRIVE_xXx_SYSTEM"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "// ============================================================================\n// 🚨 DELIVERY RISK PROVINCE HEADER GATE V2 — CANONICAL ONLY\n// n8n Code node — Run Once for All Items\n//\n// แก้ปัญหา bot recap หลุดมาเป็นที่อยู่:\n// - ไม่สแกน original / telegram_message / chat_timeline เป็นที่อยู่หลัก\n// - ใช้เฉพาะฟิวด์ที่โหนดก่อนหน้าคัดแล้ว\n// - ตัดข้อความบอท/ร้านออกจากหลักฐาน\n// - ถ้าจังหวัดกับรหัสไปรษณีย์ขัดกัน ให้ REVIEW ห้ามเดา\n// - ไม่ลบแถว และเก็บหัวบิลเดิมไว้เสมอ\n// ============================================================================\n\nconst RESTRICTED_AREAS = [\n  ['นครราชสีมา', '30000'], ['บุรีรัมย์', '31000'], ['สุรินทร์', '32000'],\n  ['ศรีสะเกษ', '33000'], ['อุบลราชธานี', '34000'], ['ยโสธร', '35000'],\n  ['ชัยภูมิ', '36000'], ['อำนาจเจริญ', '37000'], ['บึงกาฬ', '38000'],\n  ['หนองบัวลำภู', '39000'], ['ขอนแก่น', '40000'], ['อุดรธานี', '41000'],\n  ['เลย', '42000'], ['หนองคาย', '43000'], ['มหาสารคาม', '44000'],\n  ['ร้อยเอ็ด', '45000'], ['กาฬสินธุ์', '46000'], ['สกลนคร', '47000'],\n  ['นครพนม', '48000'], ['มุกดาหาร', '49000'],\n].map(([province, postcode]) => ({ province, postcode, prefix: postcode.slice(0, 2) }));\n\nconst BILL_HEADER_KEYS = [\n  'bill_header', 'bill_header_saved', 'telegramHeader', 'telegram_header',\n  'stock_notice', 'product_master_stock_notice', 'header',\n];\n\n// เฉพาะชื่อฟิวด์ที่ถือว่าเป็นผลคัดที่อยู่แล้ว ห้ามเติม original/message/chat_timeline ที่นี่\nconst CANONICAL_DESTINATION_KEYS = new Set([\n  'address_fibo_selected_clean', 'address_display_packer', 'addressclean',\n  'clean_address', 'rescue_address_normalized', 'final_address_for_bill',\n  'full_address', 'telegram_primary_address', 'shipping_address',\n  'delivery_address', 'recipient_address', 'address', 'province',\n  'province_name', 'shipping_province', 'delivery_province',\n  'postcode', 'postal_code', 'zip', 'zipcode', 'shipping_postcode',\n  'delivery_postcode', 'รหัสไปรษณีย์', 'จังหวัด',\n]);\n\nconst SHIPPING_PATH_HINT = /shipping|ship_to|delivery|deliver_to|recipient|receiver|consignee|destination|ปลายทาง|จัดส่ง|ผู้รับ/iu;\nconst BILLING_HINT = /billing|invoice|bill_to|ใบกำกับ|ที่อยู่ใบเสร็จ|ที่อยู่ออกบิล/iu;\nconst POSTCODE_KEY = /postcode|postal|zip|รหัสไปรษณีย์/iu;\nconst PROVINCE_KEY = /province|จังหวัด/iu;\nconst ORDER_REFERENCE_KEYS = [\n  'order_number', 'order_no', 'order_id', 'upsert_key',\n  'chat_link_key', 'invoice_number', 'tracking_number', 'id',\n];\n\n// ถ้าพบวลีเหล่านี้ในค่าที่อยู่ ให้ถือเป็นข้อความทวน/ข้อความหลังการขาย ไม่ใช่ address evidence\nconst BOT_RECAP_RE = /(?:เชื่อมต่อ.{0,80}ทีม|ได้เชื่อมต่อพี่กับทีม|ส่งต่อออเดอร์ให้ทีม|ทีมจะ(?:ช่วย|ตรวจ|จัดส่ง|แจ้ง|ดูแล)|ทีมจะรีบจัดส่ง|อัปเดตเลขพัสดุ|ขอเลขพัสดุ|เช็คพัสดุ|เช็กพัสดุ|tracking|หน้าเช็คพัสดุ|รบกวนถ่าย(?:คลิป|วิดีโอ)|แกะเช็คของก่อนจ่าย|ไม่ต้องโอนก่อน|มีอะไรให้หนูช่วยเพิ่ม)/iu;\n\nfunction text(value) {\n  if (value === undefined || value === null) return '';\n  if (typeof value === 'object') {\n    try { return JSON.stringify(value); } catch (_) { return String(value); }\n  }\n  return String(value).normalize('NFC')\n    .replace(/[\\u200B-\\u200D\\uFEFF]/g, '')\n    .replace(/\\\\n/g, '\\n').trim();\n}\nfunction compact(value) { return text(value).replace(/\\s+/g, ' ').trim(); }\nfunction normalizeText(value) {\n  return text(value).replace(/\\s+/g, '').replace(/^จังหวัด/iu, '').replace(/^จ\\./iu, '');\n}\nfunction firstExisting(row, keys) {\n  for (const key of keys) {\n    const value = text(row?.[key]);\n    if (value) return value;\n  }\n  return '';\n}\nfunction isBotRecap(value) { return BOT_RECAP_RE.test(compact(value)); }\nfunction keyName(path) { return String(path[path.length - 1] || '').toLowerCase(); }\n\nfunction collectCanonicalFields(value, path = [], out = [], depth = 0) {\n  if (value === null || value === undefined || depth > 5) return out;\n  if (typeof value === 'string' || typeof value === 'number') {\n    const fieldKey = keyName(path);\n    const pathText = path.join('.');\n    const fieldText = text(value);\n    if (!fieldText || !CANONICAL_DESTINATION_KEYS.has(fieldKey)) return out;\n    if (BILLING_HINT.test(pathText)) return out;\n    out.push({\n      path: pathText,\n      key: fieldKey,\n      text: fieldText,\n      shipping: SHIPPING_PATH_HINT.test(pathText) || fieldKey.includes('address') || fieldKey.includes('province') || fieldKey.includes('post'),\n      botRecap: isBotRecap(fieldText),\n    });\n    return out;\n  }\n  if (Array.isArray(value)) {\n    value.forEach((entry, index) => collectCanonicalFields(entry, [...path, String(index)], out, depth + 1));\n    return out;\n  }\n  if (typeof value === 'object') {\n    for (const [key, child] of Object.entries(value)) {\n      collectCanonicalFields(child, [...path, key], out, depth + 1);\n    }\n  }\n  return out;\n}\n\nfunction collectPostcodes(fields) {\n  const values = [];\n  for (const field of fields) {\n    const direct = POSTCODE_KEY.test(field.path) || /address|จัดส่ง|ปลายทาง/iu.test(field.path);\n    if (!direct) continue;\n    for (const match of field.text.matchAll(/(?:^|\\D)(\\d{5})(?!\\d)/g)) values.push(match[1]);\n  }\n  return [...new Set(values)];\n}\n\nfunction findOrderReference(json) {\n  const wanted = new Set(ORDER_REFERENCE_KEYS.map((key) => key.toLowerCase()));\n  const queue = [{ value: json, depth: 0 }];\n  while (queue.length) {\n    const { value, depth } = queue.shift();\n    if (!value || typeof value !== 'object' || depth > 5) continue;\n    for (const [key, child] of Object.entries(value)) {\n      if (wanted.has(key.toLowerCase()) && (typeof child === 'string' || typeof child === 'number') && text(child)) {\n        return text(child).replace(/[\\r\\n\\t]+/g, ' ').slice(0, 100);\n      }\n      if (child && typeof child === 'object') queue.push({ value: child, depth: depth + 1 });\n    }\n  }\n  return 'ไม่พบเลขอ้างอิง';\n}\n\nfunction inspectDestination(json) {\n  const all = collectCanonicalFields(json);\n  const usable = all.filter((field) => !field.botRecap);\n  const botRejected = all.filter((field) => field.botRecap);\n\n  // ถ้ามี shipping-labelled fields ให้เชื่อเฉพาะชุดนั้นก่อน\n  const shipping = usable.filter((field) => field.shipping);\n  const fields = shipping.length ? shipping : usable;\n  const normalizedAddress = fields.map((field) => normalizeText(field.text)).join('|');\n\n  const provinceMatches = RESTRICTED_AREAS.filter((area) => normalizedAddress.includes(normalizeText(area.province)));\n  const postcodes = collectPostcodes(fields);\n  const postcodeMatches = RESTRICTED_AREAS.filter((area) => postcodes.some((postcode) => postcode.startsWith(area.prefix)));\n  const provinceArea = provinceMatches[0] || null;\n  const postcodeArea = postcodeMatches[0] || null;\n\n  const conflict = Boolean(\n    provinceArea && postcodeArea && provinceArea.province !== postcodeArea.province\n  ) || provinceMatches.length > 1 || postcodeMatches.length > 1;\n\n  const explicitProvincePresent = fields.some((field) => PROVINCE_KEY.test(field.path) && text(field.text));\n  const destinationEvidence = fields.length > 0;\n  const enoughToDecide = Boolean(provinceArea || postcodeArea || postcodes.length || explicitProvincePresent);\n\n  return {\n    allFields: all,\n    fields,\n    botRejected,\n    area: conflict ? null : (provinceArea || postcodeArea),\n    provinceArea,\n    postcodeArea,\n    matchedBy: conflict\n      ? 'conflict'\n      : provinceArea && postcodeArea && provinceArea.province === postcodeArea.province\n        ? 'province_and_postcode'\n        : provinceArea\n          ? 'province'\n          : postcodeArea\n            ? 'postcode_prefix'\n            : '',\n    postcodes,\n    conflict,\n    destinationEvidence,\n    enoughToDecide,\n  };\n}\n\nfunction originalHeader(row) { return firstExisting(row, BILL_HEADER_KEYS); }\n\nfunction buildRiskHeader({ status, province, postcodeText, orderReference, matchedBy, conflict }) {\n  if (status === 'BLOCK') {\n    return [\n      '🚨 RISK DESTINATION ALERT 🚨',\n      '━━━━━━━━━━━━━━━━━━━━',\n      '🛡️ ปลายทางอยู่ในกลุ่มพื้นที่เสี่ยง',\n      `📍 จังหวัด: ${province}`,\n      `📮 รหัสไปรษณีย์: ${postcodeText}`,\n      `🔎 ตรวจพบจาก: ${matchedBy === 'province_and_postcode' ? 'ชื่อจังหวัด + รหัสไปรษณีย์จากฟิวด์คัดแล้ว' : matchedBy === 'province' ? 'ชื่อจังหวัดจากฟิวด์คัดแล้ว' : 'รหัสไปรษณีย์จากฟิวด์คัดแล้ว'}`,\n      '⏸️ กรุณาตรวจสอบก่อนแพ็ก/ส่ง',\n      '━━━━━━━━━━━━━━━━━━━━',\n    ].join('\\n');\n  }\n  if (status === 'REVIEW') {\n    return [\n      conflict ? '🧩 ADDRESS EVIDENCE CONFLICT 🧩' : '⚠️ DESTINATION REVIEW REQUIRED ⚠️',\n      '━━━━━━━━━━━━━━━━━━━━',\n      conflict ? 'พบจังหวัดกับรหัสไปรษณีย์ไม่ตรงกัน หรือพบหลายหลักฐาน' : 'ยังยืนยันจังหวัดปลายทางจากฟิวด์คัดแล้วไม่ได้',\n      '🔍 ไม่ใช้ข้อความบอททวนมาตัดสินอัตโนมัติ กรุณาตรวจที่อยู่จริง',\n      '━━━━━━━━━━━━━━━━━━━━',\n    ].join('\\n');\n  }\n  return '';\n}\n\nfunction applyHeaderOverride(json, riskHeader, original) {\n  if (!riskHeader) {\n    return { ...json, risk_header_override_active: false, risk_header_original: original || '' };\n  }\n  return {\n    ...json,\n    risk_header_original: original || '',\n    risk_header_override_active: true,\n    risk_header_override: riskHeader,\n    bill_header: riskHeader,\n    bill_header_saved: riskHeader,\n    telegramHeader: riskHeader,\n    telegram_header: riskHeader,\n    stock_notice: riskHeader,\n    original_bill_header: original || '',\n    original_stock_notice: text(json.stock_notice),\n    original_product_master_stock_notice: text(json.product_master_stock_notice),\n  };\n}\n\nreturn $input.all().map((item, index) => {\n  const json = item?.json || {};\n  const destination = inspectDestination(json);\n  const status = destination.conflict\n    ? 'REVIEW'\n    : destination.area\n      ? 'BLOCK'\n      : destination.enoughToDecide\n        ? 'ALLOW'\n        : 'REVIEW';\n\n  const orderReference = findOrderReference(json);\n  const province = destination.area?.province || 'ยังระบุจังหวัดไม่ได้';\n  const postcodeText = destination.postcodes.length ? destination.postcodes.join(', ') : 'ไม่พบ';\n  const riskHeader = buildRiskHeader({\n    status,\n    province,\n    postcodeText,\n    orderReference,\n    matchedBy: destination.matchedBy,\n    conflict: destination.conflict,\n  });\n  const outputJson = applyHeaderOverride(json, riskHeader, originalHeader(json));\n\n  return {\n    json: {\n      ...outputJson,\n      _delivery_gate: {\n        status,\n        restricted: status === 'BLOCK',\n        review: status === 'REVIEW',\n        province: destination.area?.province || null,\n        matchedBy: destination.matchedBy || null,\n        postcodes: destination.postcodes,\n        orderReference,\n        destinationEvidence: destination.destinationEvidence,\n        enoughToDecide: destination.enoughToDecide,\n        conflict: destination.conflict,\n        canonicalFieldPaths: destination.fields.map((field) => field.path),\n        botFieldsRejected: destination.botRejected.map((field) => field.path),\n        riskHeaderActive: Boolean(riskHeader),\n        telegramWarning: riskHeader,\n      },\n      delivery_risk_status: status,\n      delivery_risk_province: destination.area?.province || '',\n      delivery_risk_matched_by: destination.matchedBy || '',\n      delivery_risk_postcodes: destination.postcodes,\n      delivery_risk_header: riskHeader,\n      delivery_risk_header_active: Boolean(riskHeader),\n      delivery_risk_order_reference: orderReference,\n      delivery_risk_conflict: destination.conflict,\n      delivery_risk_canonical_fields: destination.fields.map((field) => field.path),\n      delivery_risk_bot_fields_rejected: destination.botRejected.map((field) => field.path),\n    },\n    ...(item.binary ? { binary: item.binary } : {}),\n    pairedItem: { item: index },\n  };\n});\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -14288,
        7904
      ],
      "id": "6e21c8f2-1e95-409e-b616-3b7141a0de87",
      "name": "🚨DELIVERY_RISK_PROVINCE_HEADER🚨"
    }
  ],
  "connections": {
    "🪐ANDROMEDA_xXx_SENT1": {
      "main": [
        [
          {
            "node": "🧿END_DATETIME_BKK2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "🪐ANDROMEDA_xXx_SENT1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "🗝️HERMES_ARCHIVE11",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🌀SINGULARITY_xXx_EXCHANGE7",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "BILL HEADER INJECTOR1": {
      "main": [
        [
          {
            "node": "⭐⭐🍁⭐⭐1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "⭐⭐👑⭐⭐1": {
      "main": [
        [
          {
            "node": "Loop Over Items1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🌟GENESIS_xXx_HISTORY4",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🌟GENESIS_xXx_HISTORY3",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🔸 PARADOX_xXx_EXCHANGE1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🧿END_DATETIME_BKK2": {
      "main": [
        [
          {
            "node": "🚨DELIVERY_RISK_PROVINCE_HEADER🚨",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items1": {
      "main": [
        [],
        [
          {
            "node": "🌟GENESIS_xXx_HISTORY5",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "⭐⭐🍁⭐⭐1": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "⭐⭐👑⭐⭐1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🔸 PARADOX_xXx_EXCHANGE1": {
      "main": [
        [
          {
            "node": "🌀SINGULARITY_xXx_EXCHANGE10",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌟GENESIS_xXx_HISTORY3": {
      "main": [
        [
          {
            "node": "🌀SINGULARITY_xXx_EXCHANGE9",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌟GENESIS_xXx_HISTORY4": {
      "main": [
        [
          {
            "node": "🗝️HERMES_ARCHIVE6",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌟GENESIS_xXx_HISTORY5": {
      "main": [
        [
          {
            "node": "🗝️HERMES_ARCHIVE9",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait1": {
      "main": [
        [
          {
            "node": "Loop Over Items1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗝️HERMES_ARCHIVE6": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗝️HERMES_ARCHIVE9": {
      "main": [
        [
          {
            "node": "Wait1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗝️HERMES_ARCHIVE11": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING3",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌀SINGULARITY_xXx_EXCHANGE7": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING3",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌀SINGULARITY_xXx_EXCHANGE9": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌀SINGULARITY_xXx_EXCHANGE10": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🚨DELIVERY_RISK_PROVINCE_HEADER🚨": {
      "main": [
        [
          {
            "node": "BILL HEADER INJECTOR1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "f4fcccb61c84d5d75854e90735e6c1d4dc7f96a459bba4b39bf25fd07d0f4e26"
  }
}