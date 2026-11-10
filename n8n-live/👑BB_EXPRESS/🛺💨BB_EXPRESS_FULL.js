{
  "nodes": [
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -16000,
        6144
      ],
      "id": "b94576bd-7399-4b0f-bbb8-c9bb4883bc1a",
      "name": "🎱🍁#DARKSIDEMARKETING",
      "disabled": true
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
        -17792,
        5712
      ],
      "id": "0612a60f-86be-4e60-a968-b28369e56538",
      "name": "🪐ANDROMEDA_xXx_SENT",
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
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
        -18016,
        5712
      ],
      "id": "558526e1-e309-4081-b62b-3b147c07f241",
      "name": "Schedule Trigger4",
      "disabled": true
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
              "keyValue": "={{ $('⭐⭐👑⭐⭐').item.json.upsert_key }}"
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
              "fieldValue": "SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "🌟GENESIS_xXx_HISTORY"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -16000,
        5632
      ],
      "id": "b1b97e48-0653-4556-a794-745b5447c994",
      "name": "🗝️HERMES_ARCHIVE",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
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
              "keyValue": "={{ $('⭐⭐👑⭐⭐').item.json.upsert_key }}"
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
              "fieldValue": "SENT"
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
              "fieldValue": "SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "☁️NEBULA_xXx_HISTORYz"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -16224,
        5952
      ],
      "id": "6b9ebcdc-187a-4bcb-8630-ad439470d4da",
      "name": "🗝️HERMES_ARCHIVE2",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
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
              "keyValue": "={{ $('⭐⭐👑⭐⭐').item.json.upsert_key }}"
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
              "fieldValue": "SENT"
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
              "fieldValue": "SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "☁️NEBULA_xXx_HISTORYz"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -16224,
        6144
      ],
      "id": "d8e439e9-0843-4eac-a6eb-ac31000f2e88",
      "name": "🌀SINGULARITY_xXx_EXCHANGE",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
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
              "keyValue": "={{ $('⭐⭐👑⭐⭐').item.json.upsert_key }}"
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
              "fieldValue": "SENT"
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
              "fieldValue": "SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "☁️NEBULA_xXx_HISTORYz"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -16224,
        6336
      ],
      "id": "6b122f1a-76e4-4043-8a1a-1b621e64d4d3",
      "name": "🌀SINGULARITY_xXx_EXCHANGE1",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
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
        -16672,
        5344
      ],
      "id": "d999dbb5-bfdb-4512-9642-c11ac9422b6f",
      "name": "Switch2",
      "disabled": true
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
              "keyValue": "={{ $('⭐⭐🍁⭐⭐').item.json.upsert_key }}"
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
              "fieldValue": "SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "☁️NEBULA_xXx_HISTORYz"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -16448,
        5248
      ],
      "id": "a34c8765-9c38-457d-81fe-7fb5a2ac1fec",
      "name": "🗝️HERMES_ARCHIVE1",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
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
              "keyValue": "={{ $('⭐⭐🍁⭐⭐').item.json.upsert_key }}"
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
              "fieldValue": "SENT"
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
              "fieldValue": "SENT"
            },
            {
              "fieldId": "telegram_sent_at",
              "fieldValue": "={{ $now.toISO() }}"
            },
            {
              "fieldId": "target_room",
              "fieldValue": "☁️NEBULA_xXx_HISTORYz"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -16448,
        5440
      ],
      "id": "c2dfdece-2d2c-4e27-861b-aca570c33f4d",
      "name": "🌀SINGULARITY_xXx_EXCHANGE2",
      "alwaysOutputData": false,
      "credentials": {
        "supabaseApi": {
          "id": "M57HMGs21S6xg28P",
          "name": "🌀SINGULARITY_X_ZERO"
        }
      },
      "disabled": true
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.noOp",
      "typeVersion": 1,
      "position": [
        -16224,
        5344
      ],
      "id": "6ee6636c-3983-4431-991b-a50d3de012da",
      "name": "🎱🍁#DARKSIDEMARKETING1",
      "disabled": true
    },
    {
      "parameters": {
        "jsCode": "function value(r, k) {\n  const v = r?.[k];\n  return v === undefined || v === null ? \"\" : String(v).trim();\n}\n\nfunction firstExisting(r, keys) {\n  for (const k of keys) {\n    const v = value(r, k);\n    if (v !== \"\") return v;\n  }\n  return \"\";\n}\n\nfunction escapeHtml(v) {\n  return String(v ?? \"\")\n    .replaceAll(\"&\", \"&amp;\")\n    .replaceAll(\"<\", \"&lt;\")\n    .replaceAll(\">\", \"&gt;\")\n    .replaceAll('\"', \"&quot;\");\n}\n\nfunction htmlToPlainText(value) {\n  return String(value ?? \"\")\n    .replace(/<br\\s*\\/?\\s*>/gi, \"\\n\")\n    .replace(/<\\/(?:p|div|li|tr|h[1-6])\\s*>/gi, \"\\n\")\n    .replace(/<[^>]*>/g, \"\")\n    .replace(/&nbsp;/gi, \" \")\n    .replace(/&#39;|&apos;/gi, \"'\")\n    .replace(/&quot;/gi, '\"')\n    .replace(/&lt;/gi, \"<\")\n    .replace(/&gt;/gi, \">\")\n    .replace(/&amp;/gi, \"&\")\n    .replace(/&#(\\d+);/g, (_, n) => String.fromCodePoint(Number(n)))\n    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))\n    .replace(/\\r\\n?/g, \"\\n\")\n    .replace(/[ \\t]+\\n/g, \"\\n\")\n    .replace(/\\n{3,}/g, \"\\n\\n\")\n    .trim();\n}\n\nconst inputItems = $input.all();\n\nreturn inputItems.map((item) => {\n  const row = item?.json ?? {};\n\n  // 1. ดึงข้อความบิลเดิม (ที่มีบล็อก Change Audit ครบถ้วนแล้ว) มาเป็นตัวตั้งต้น\n  let telegramMsg = firstExisting(row, [\n    'telegram_message',\n    'telegram_main_bill',\n    'telegram_message_for_send_final',\n    'raw_text'\n  ]);\n\n  // 2. ดึง stock_notice มาแต่งHTMLให้หล่อเหมือนฝั่งบิลเดี่ยว\n  const rawStockNotice = firstExisting(row, ['stock_notice', 'dynamic_header', 'header_notice']);\n  const formattedNotice = rawStockNotice ? `<b>${escapeHtml(rawStockNotice)}</b>` : \"\";\n\n  // 3. เช็คว่าในข้อความมี stock_notice ตัวนี้แปะอยู่แล้วหรือยัง (ป้องกันการเบิ้ลซ้ำ)\n  const hasNoticeAlready = formattedNotice && telegramMsg.includes(rawStockNotice);\n\n  // 4. ถ้ามี stock_notice และยังไม่เคยถูกแปะ ให้เอามา \"เสียบบนสุด\" เหนือเวลาสั่งซื้อ\n  if (formattedNotice && !hasNoticeAlready) {\n    telegramMsg = `${formattedNotice}\\n${telegramMsg}`;\n  }\n\n  // สร้างฟิลด์เว็บแยกจาก HTML สำหรับ Telegram; ฟิลด์ส่งกลุ่มคงเดิม\n  const telegramChangeAlert = firstExisting(row, ['telegram_change_alert']);\n  const telegramMessageWeb = htmlToPlainText(telegramMsg);\n  const telegramChangeAlertWeb = htmlToPlainText(telegramChangeAlert);\n\n  return {\n    json: {\n      ...row,\n      // อัปเดตฟิลด์ข้อความส่งออกให้เป็นตัวที่ใส่หัวแจ้งเตือนสต็อกเรียบร้อยแล้ว\n      telegram_message: telegramMsg,\n      telegram_main_bill: telegramMsg,\n      telegram_message_for_send_final: telegramMsg,\n      telegram_message_web: telegramMessageWeb,\n      telegram_change_alert_web: telegramChangeAlertWeb,\n      audit_header_inject_status: formattedNotice ? (hasNoticeAlready ? 'ALREADY_EXISTS' : 'INJECTED_SUCCESS') : 'NO_NOTICE'\n    }\n  };\n});"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -17120,
        5712
      ],
      "id": "45f8bf41-dd92-474c-a995-45a663eacf40",
      "name": "BILL HEADER INJECTOR",
      "disabled": true
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
        -16672,
        6016
      ],
      "id": "bf707e91-83bd-4ea4-8f26-4e9cf5847637",
      "name": "⭐⭐👑⭐⭐",
      "disabled": true
    },
    {
      "parameters": {
        "jsCode": "// n8n Code node — Mode: Run Once for All Items\n// 🛡️ THE GOD GATEKEEPER : DK DRAKSIDE - SPACE VAULT EDITION (TIME CHECK ONLY)\n\nconst START_DATETIME_BKK = \"2026-10-29 00:00:00\";\nconst END_DATETIME_BKK   = \"2028-12-30 00:00:01\";\n\nconst clean = (value) => String(value ?? \"\").trim().replace(/\\s+/g, \" \");\n\nfunction parseDateTimeMs(value) {\n  const s = clean(value);\n  if (!s) return null;\n  const parsed = Date.parse(s);\n  return Number.isFinite(parsed) ? parsed : null;\n}\n\n// 1. คำนวณขอบเขตเวลาวิกฤตฝั่งเซิร์ฟเวอร์อิงเวลาไทยปัจจุบัน (UTC+7)\nconst now = new Date();\nconst nowUtcMs = now.getTime();\nconst thaiNow = new Date(nowUtcMs + (7 * 60 * 60 * 1000));\n\n// ⏰ ตั้งเวลา Cutoff รอบแพ็กของ \"บ่ายสองโมงตรงของเมื่อวาน\" (13:45 UTC ตามสูตรดั้งเดิม)\nconst yesterdayCutoff = new Date(thaiNow);\nyesterdayCutoff.setUTCDate(yesterdayCutoff.getUTCDate() - 3); \nyesterdayCutoff.setUTCHours(13, 45, 0, 4); \nconst minAllowedTimeMs = yesterdayCutoff.getTime() - (7 * 60 * 60 * 1000);\n\n// 🚨 เกณฑ์เหล็กป้องกันระบบสะดุด: ถอยหลัง 24 ชม. ตรงๆ นับจากวินาทีนี้เป๊ะ\nconst absolute24hAgoMs = nowUtcMs - (24 * 60 * 60 * 1000);\nconst maxAllowedTimeMs = nowUtcMs + (12 * 60 * 60 * 1000);\n\n// ฟังก์ชันแกะเวลาแชทไทย \"30/10/69 15:55:33\" ออกมาเป็น Timestamp สากล\nfunction parseThaiDateTime(raw) {\n  if (!raw) return null;\n  try {\n    const [datePart, timePart] = String(raw).trim().split(\" \");\n    const [d, m, y] = datePart.split(\"/\");\n    \n    let year = parseInt(y);\n    if (year < 100) year += 2500; // แปลง 69 -> 2569\n    year -= 543; // แปลง พ.ศ. -> ค.ศ.\n    \n    const [hour, minute, second] = (timePart || \"00:00:00\").split(\":\").map(Number);\n    return new Date(Date.UTC(year, parseInt(m) - 1, parseInt(d), hour - 7, minute, second)).getTime();\n  } catch {\n    return null;\n  }\n}\n\nreturn $input.all().flatMap(({ json: row = {} }) => {\n  const orderTimeDisplay = clean(row.order_time_display || \"-\");\n\n  // 🎯 สวิตช์เช็กเวลาหลักจาก order_time_display ตรงๆ ตัวเดียวจบ\n  const rawChatTime = orderTimeDisplay;\n  const chatTimestamp = parseThaiDateTime(rawChatTime);\n\n  // 🛠️ ⚡ *เช็กเกณฑ์เวลาแบบ 2 ทางแยกคัดป้าย (ใช่ กับ ไม่ใช่)*\n  let bkk_cutoff_route = \"BLOCK_TG_EXPIRED\"; // ตั้งค่าเริ่มต้นเป็น \"ไม่ใช่\" (BLOCK)\n  let isWithin24h = false;\n  let chatAgeHours = 0;\n\n  if (chatTimestamp) {\n    const diffInMs = nowUtcMs - chatTimestamp;\n    chatAgeHours = diffInMs / (1000 * 60 * 60);\n\n    // 🎯 เงื่อนไข \"ใช่\" (ผ่านเกณฑ์เวลาทั้งหมด) -> ปรับป้ายเป็น ALLOW_TG_SEND\n    if (chatTimestamp >= absolute24hAgoMs && chatTimestamp >= minAllowedTimeMs && chatTimestamp <= maxAllowedTimeMs) {\n      bkk_cutoff_route = \"ALLOW_TG_SEND\"; \n      isWithin24h = true;\n    }\n  }\n\n  // ส่งผลลัพธ์ออกสู่สายพานปลายทางแบบคืนค่าแถวข้อมูลเดิมกลับไปพร้อมประทับป้ายเวลา\n  return [\n    {\n      json: {\n        ...row,\n        order_time_display: orderTimeDisplay,\n        customerMessageTimeTh: rawChatTime,\n        // 🔀 ตราป้ายสเตตัส 2 ทางแยกเคลียร์คัตตามบรีฟ\n        bkk_cutoff_route: bkk_cutoff_route,\n        send_facebook_route: bkk_cutoff_route,\n        sendFacebookRoute: bkk_cutoff_route,\n        send_telegram_route: bkk_cutoff_route, \n        is_24h_window_valid: isWithin24h,\n        customer_chat_age_hours: chatAgeHours,\n      },\n    },\n  ];\n});\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -17568,
        5712
      ],
      "id": "ef76c5ad-a83c-4a46-a857-d6b655735a89",
      "name": "🧿END_DATETIME_BKK",
      "disabled": true
    },
    {
      "parameters": {
        "batchSize": 3,
        "options": {}
      },
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 3,
      "position": [
        -16448,
        5712
      ],
      "id": "14c7d457-23e2-4e28-821e-6cbb623511ac",
      "name": "Loop Over Items",
      "disabled": true
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
        -16896,
        5712
      ],
      "id": "fa419897-d5d9-44b8-b134-53541f104eea",
      "name": "⭐⭐🍁⭐⭐",
      "disabled": true
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
        -16448,
        6336
      ],
      "id": "8397a601-f704-45b4-aab7-7ad9724d70f9",
      "name": "🔸 PARADOX_xXx_EXCHANGE",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "byg0vHxo5ZIap74c",
          "name": "เทส"
        }
      },
      "disabled": true
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
        -16448,
        6144
      ],
      "id": "68c1387c-d1a4-4a5c-97c1-4297d055afe2",
      "name": "🌟GENESIS_xXx_HISTORY",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "e60ukliyR12WX6Pe",
          "name": "ฺฺBBBBB"
        }
      },
      "disabled": true
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
        -16448,
        5952
      ],
      "id": "a4f0aa14-caf4-47e5-ac3f-8e416dfba464",
      "name": "🌟GENESIS_xXx_HISTORY1",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "e60ukliyR12WX6Pe",
          "name": "ฺฺBBBBB"
        }
      },
      "disabled": true
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
        -16224,
        5632
      ],
      "id": "735570e0-7b77-4ba5-a0c9-df4ccb62deb2",
      "name": "🌟GENESIS_xXx_HISTORY2",
      "webhookId": "73d3a847-c366-44ce-909e-ebf33b1ee1df",
      "credentials": {
        "telegramApi": {
          "id": "e60ukliyR12WX6Pe",
          "name": "ฺฺBBBBB"
        }
      },
      "disabled": true
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.wait",
      "typeVersion": 1.1,
      "position": [
        -15776,
        5712
      ],
      "id": "87bb4430-5c0d-425f-a3aa-0fb03aff9373",
      "name": "Wait",
      "webhookId": "39166bf4-cbfb-4e70-80f9-35db4e024436",
      "disabled": true
    },
    {
      "parameters": {
        "jsCode": "// n8n Code node — Delivery Province Gate\n// Mode: Run Once for All Items\n// วางก่อน node ที่ส่งออเดอร์เข้ากลุ่ม Telegram ปกติ\n// ผลลัพธ์: _delivery_gate.status = ALLOW | BLOCK | REVIEW\n\nconst RESTRICTED_AREAS = [\n  { province: \"นครราชสีมา\", postcode: \"30000\" },\n  { province: \"บุรีรัมย์\", postcode: \"31000\" },\n  { province: \"สุรินทร์\", postcode: \"32000\" },\n  { province: \"ศรีสะเกษ\", postcode: \"33000\" },\n  { province: \"อุบลราชธานี\", postcode: \"34000\" },\n  { province: \"ยโสธร\", postcode: \"35000\" },\n  { province: \"ชัยภูมิ\", postcode: \"36000\" },\n  { province: \"อำนาจเจริญ\", postcode: \"37000\" },\n  { province: \"บึงกาฬ\", postcode: \"38000\" },\n  { province: \"หนองบัวลำภู\", postcode: \"39000\" },\n  { province: \"ขอนแก่น\", postcode: \"40000\" },\n  { province: \"อุดรธานี\", postcode: \"41000\" },\n  { province: \"เลย\", postcode: \"42000\" },\n  { province: \"หนองคาย\", postcode: \"43000\" },\n  { province: \"มหาสารคาม\", postcode: \"44000\" },\n  { province: \"ร้อยเอ็ด\", postcode: \"45000\" },\n  { province: \"กาฬสินธุ์\", postcode: \"46000\" },\n  { province: \"สกลนคร\", postcode: \"47000\" },\n  { province: \"นครพนม\", postcode: \"48000\" },\n  { province: \"มุกดาหาร\", postcode: \"49000\" },\n].map((area) => ({ ...area, prefix: area.postcode.slice(0, 2) }));\n\nconst BILLING_HINT = /billing|invoice|bill_to|ใบกำกับ|ที่อยู่ใบเสร็จ|ที่อยู่ออกบิล/i;\nconst SHIPPING_HINT = /shipping|ship_to|delivery|deliver_to|recipient|receiver|consignee|destination|ปลายทาง|จัดส่ง|ผู้รับ/i;\nconst ADDRESS_HINT = /address|province|province_name|state|region|city|district|subdistrict|tambon|amphoe|postcode|postal|zip|ที่อยู่|จังหวัด|อำเภอ|ตำบล|รหัสไปรษณีย์/i;\nconst POSTCODE_KEY = /postcode|postal|zip|รหัสไปรษณีย์/i;\nconst PROVINCE_KEY = /province|จังหวัด/i;\nconst ORDER_REFERENCE_KEYS = [\"order_number\", \"order_no\", \"order_id\", \"chat_link_key\", \"invoice_number\", \"tracking_number\", \"id\"];\n\nfunction normalizeText(value) {\n  return String(value ?? \"\")\n    .normalize(\"NFC\")\n    .replace(/[\\u200B-\\u200D\\uFEFF]/g, \"\")\n    .replace(/\\s+/g, \"\")\n    .replace(/^จังหวัด/, \"\");\n}\n\nfunction collectAddressFields(value, path = [], out = [], depth = 0) {\n  if (value == null || depth > 7) return out;\n  if (typeof value === \"string\" || typeof value === \"number\") {\n    const text = String(value).trim();\n    const pathText = path.join(\".\");\n    if (text && ADDRESS_HINT.test(pathText) && !BILLING_HINT.test(pathText)) {\n      out.push({ path: pathText, text, shipping: SHIPPING_HINT.test(pathText) });\n    }\n    return out;\n  }\n  if (Array.isArray(value)) {\n    value.forEach((entry, index) => collectAddressFields(entry, [...path, String(index)], out, depth + 1));\n    return out;\n  }\n  if (typeof value === \"object\") {\n    for (const [key, child] of Object.entries(value)) {\n      collectAddressFields(child, [...path, key], out, depth + 1);\n    }\n  }\n  return out;\n}\n\nfunction collectPostcodes(fields) {\n  const matches = [];\n  for (const field of fields) {\n    const directPostcodeField = POSTCODE_KEY.test(field.path);\n    // รหัสไปรษณีย์ในช่องเฉพาะ หรือเลข 5 หลักที่อยู่ในฟิลด์ address เท่านั้น\n    // ไม่สแกนเบอร์โทร/เลขออเดอร์จากทั้ง JSON\n    if (!directPostcodeField && !/address|ที่อยู่|จัดส่ง|ปลายทาง/i.test(field.path)) continue;\n    for (const match of field.text.matchAll(/(?:^|\\D)(\\d{5})(?!\\d)/g)) {\n      matches.push(match[1]);\n    }\n  }\n  return [...new Set(matches)];\n}\n\nfunction findOrderReference(json) {\n  const wanted = new Set(ORDER_REFERENCE_KEYS);\n  const queue = [{ value: json, depth: 0 }];\n  while (queue.length) {\n    const { value, depth } = queue.shift();\n    if (!value || typeof value !== \"object\" || depth > 5) continue;\n    for (const [key, child] of Object.entries(value)) {\n      if (wanted.has(key.toLowerCase()) && (typeof child === \"string\" || typeof child === \"number\") && String(child).trim()) {\n        return String(child).trim().replace(/[\\r\\n\\t]+/g, \" \").slice(0, 80);\n      }\n      if (child && typeof child === \"object\") queue.push({ value: child, depth: depth + 1 });\n    }\n  }\n  return \"ไม่พบเลขอ้างอิง\";\n}\n\nfunction inspectDestination(json) {\n  const allAddressFields = collectAddressFields(json);\n  const shippingFields = allAddressFields.filter((field) => field.shipping);\n  // ถ้ามีฟิลด์ที่ระบุผู้รับ/ปลายทาง/จัดส่ง ให้ใช้เฉพาะชุดนั้น ไม่เอาที่อยู่ออกบิลมาปะปน\n  const fields = shippingFields.length ? shippingFields : allAddressFields;\n  const normalizedAddress = fields.map((field) => normalizeText(field.text)).join(\"|\");\n\n  const provinceArea = RESTRICTED_AREAS.find((area) => normalizedAddress.includes(normalizeText(area.province)));\n  const postcodes = collectPostcodes(fields);\n  const postcodeArea = RESTRICTED_AREAS.find((area) => postcodes.some((postcode) => postcode.startsWith(area.prefix)));\n  const matchedArea = provinceArea || postcodeArea;\n  const explicitProvincePresent = fields.some((field) => PROVINCE_KEY.test(field.path) && field.text.trim());\n  const destinationEvidence = fields.length > 0;\n  const enoughToDecide = Boolean(provinceArea || postcodes.length || explicitProvincePresent);\n\n  return {\n    area: matchedArea,\n    matchedBy: provinceArea ? \"province\" : postcodeArea ? \"postcode_prefix\" : \"\",\n    postcodes,\n    destinationEvidence,\n    enoughToDecide,\n  };\n}\n\nreturn $input.all().map((item, index) => {\n  const json = item.json ?? {};\n  const destination = inspectDestination(json);\n  const status = destination.area ? \"BLOCK\" : destination.enoughToDecide ? \"ALLOW\" : \"REVIEW\";\n  const orderReference = findOrderReference(json);\n  const province = destination.area?.province ?? \"ยังระบุจังหวัดไม่ได้\";\n  const postcodeText = destination.postcodes.length ? destination.postcodes.join(\", \") : \"ไม่พบ\";\n\n  let telegramWarning = \"\";\n  if (status === \"BLOCK\") {\n    telegramWarning = [\n      \"⛔ งดส่งออเดอร์ปลายทางพื้นที่เสี่ยง\",\n      `อ้างอิง: ${orderReference}`,\n      `จังหวัด: ${province}`,\n      `รหัสไปรษณีย์ที่พบ: ${postcodeText}`,\n      \"รายการนี้ถูกแยกออกจากเส้นทางส่งปกติแล้ว โปรดตรวจนโยบาย/ยืนยันก่อนดำเนินการต่อ\",\n    ].join(\"\\n\");\n  } else if (status === \"REVIEW\") {\n    telegramWarning = [\n      \"⚠️ พักตรวจที่อยู่ก่อนส่งออเดอร์\",\n      `อ้างอิง: ${orderReference}`,\n      \"หาเขตปลายทาง/จังหวัด/รหัสไปรษณีย์จากข้อมูลที่เข้า node ไม่ได้ครบ\",\n      \"รายการนี้ถูกแยกออกจากเส้นทางส่งปกติ เพื่อไม่ให้ที่อยู่คลุมเครือผ่านอัตโนมัติ\",\n    ].join(\"\\n\");\n  }\n\n  return {\n    json: {\n      ...json,\n      _delivery_gate: {\n        status,\n        restricted: status === \"BLOCK\",\n        province: destination.area?.province ?? null,\n        matchedBy: destination.matchedBy || null,\n        postcodes: destination.postcodes,\n        orderReference,\n        telegramWarning,\n      },\n    },\n    ...(item.binary ? { binary: item.binary } : {}),\n    pairedItem: { item: index },\n  };\n});\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -17344,
        5712
      ],
      "id": "87a9c822-fb85-49f3-ae76-63329f611205",
      "name": "🧿END_DATETIME_BKK1",
      "disabled": true
    },
    {
      "parameters": {
        "jsCode": "// ======================================================= //\n// 🛡️ THE GOD GATEKEEPER : CUTOFF 14:00 YESTERDAY          //\n// ======================================================= //\n\nconst tempFilteredItems = [];\n\n// 1. เวลาปัจจุบันตั้งต้น (อิงเวลาไทยปัจจุบัน)\nconst now = new Date();\nconst nowUtcMs = now.getTime();\nconst thaiNow = new Date(nowUtcMs + (7 * 60 * 60 * 1000));\n\n// 2. คำนวณหาเวลา \"14:00:00 ของเมื่อวาน\" (14:00 BKK Cutoff)\nconst yesterdayCutoff = new Date(thaiNow);\nyesterdayCutoff.setUTCDate(yesterdayCutoff.getUTCDate() - 0);\nyesterdayCutoff.setUTCHours(22, 0, 0, 0); // ตั้งเป้าไว้ที่บ่าย 2 โมงเมื่อวาน\n\n// แปลงกลับเป็น UTC Timestamp เพื่อเทียบกับ order_time\nconst minAllowedTime = yesterdayCutoff.getTime() - (7 * 60 * 60 * 1000);\nconst maxAllowedTime = nowUtcMs + (12 * 60 * 60 * 1000); // เผื่ออนาคตไม่เกิน 12 ชม.\n\n// ฟังก์ชันแปลงวันที่ภาษาไทยและ พ.ศ. ให้เป็น Timestamp ที่แม่นยำที่สุด\nfunction parseThaiDateTime(raw) {\n  if (!raw) return null;\n  raw = String(raw).trim();\n  try {\n    if (raw.includes('/')) {\n      const parts = raw.split(' ');\n      const datePart = parts[0];\n      const timePart = parts[1] || '00:00:00';\n      \n      const dateSplits = datePart.split('/');\n      if (dateSplits.length === 3) {\n        let [d, m, y] = dateSplits.map(Number);\n        \n        if (y < 100) {\n          y = y + 2500 - 543; \n        } else if (y > 2400) {\n          y = y - 543; \n        }\n        \n        const timeSplits = timePart.split(':').map(Number);\n        const hour = timeSplits[0] || 0;\n        const minute = timeSplits[1] || 0;\n        const second = timeSplits[2] || 0;\n        \n        return new Date(Date.UTC(y, m - 1, d, hour - 7, minute, second)).getTime();\n      }\n    }\n    \n    const parsed = new Date(raw);\n    return isNaN(parsed.getTime()) ? null : parsed.getTime();\n  } catch {\n    return null;\n  }\n}\n\nfor (const item of items) {\n  const j = item.json || item;\n  const sniperText = j.SNIPER_X_TEXT || \"\";\n  \n  // 1. คัดกรองสัญลักษณ์ขยะหรือข้อความบอทที่ไม่ใช่ออเดอร์จริงออก\n  if (sniperText.includes(\"📌\") || sniperText.includes(\"GRAVEYARD\") || sniperText.toLowerCase().includes(\"black\")) {\n    continue;\n  }\n\n  // 2. ดึงเวลาจากฟิลด์ต่างๆ โดยให้ความสำคัญกับ order_time หรือ order_time_display\n  const rawTimeField = j.order_time_display || j.order_time || \"\";\n  const orderTimestamp = parseThaiDateTime(rawTimeField);\n\n  // ถ้าไม่มีเวลา หรือแปลงไม่ได้ ให้ดีดตกรางทันที\n  if (!orderTimestamp) {\n    continue;\n  }\n\n  // 3. 🛠️ ตรวจสอบความถูกต้องแบบเฉียบขาด (เอาเฉพาะหลังบ่าย 2 เมื่อวานเท่านั้น)\n  if (orderTimestamp < minAllowedTime) {\n    // 🛑 ต่ำกว่าบ่าย 2 เมื่อวาน -> สั่งเด็ดหัวคัดทิ้งทันที ห้ามลอยไปเข้าคิวสะสมในคลัง!\n    continue; \n  } else if (orderTimestamp > maxAllowedTime) {\n    // ❌ ออเดอร์ล้ำอนาคตเกินจริง -> ตัดทิ้งป้องกันระบบรวน\n    continue;\n  } else {\n    // ✅ ออเดอร์สดใหม่ผ่านเกณฑ์ (ตั้งแต่หลังบ่าย 2 เมื่อวานเป็นต้นมา) -> วิ่งเข้าสายหลักปกติ\n    j.is_backlog = false;\n    j.branch_route = 'MAIN_DISPATCH_FLOW';\n    j.life_status = '🏁 NITRO_READY';\n  }\n\n  // แนบ timestamp ไว้สำหรับจัดเรียงลำดับออเดอร์สด\n  tempFilteredItems.push({\n    json: j,\n    timestamp: orderTimestamp\n  });\n}\n\n// 4. 🔄 เรียงลำดับออเดอร์จากเก่าไปใหม่ (FIFO)\ntempFilteredItems.sort((a, b) => a.timestamp - b.timestamp);\n\n// 5. ส่งออกข้อมูลที่ผ่านการตรวจสอบแล้วเฉพาะบิลสดใหม่\nconst output = [];\nfor (const sortedItem of tempFilteredItems) {\n  output.push({ json: sortedItem.json });\n}\nreturn output;\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -17824,
        6160
      ],
      "id": "c22caff0-be24-4444-8368-b7b7ddb0ac25",
      "name": "⏰CUTOFF 14:00 YESTERDAY",
      "disabled": true
    }
  ],
  "connections": {
    "🪐ANDROMEDA_xXx_SENT": {
      "main": [
        [
          {
            "node": "🧿END_DATETIME_BKK",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Schedule Trigger4": {
      "main": [
        [
          {
            "node": "🪐ANDROMEDA_xXx_SENT",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗝️HERMES_ARCHIVE": {
      "main": [
        [
          {
            "node": "Wait",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗝️HERMES_ARCHIVE2": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌀SINGULARITY_xXx_EXCHANGE": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌀SINGULARITY_xXx_EXCHANGE1": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch2": {
      "main": [
        [
          {
            "node": "🗝️HERMES_ARCHIVE1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🌀SINGULARITY_xXx_EXCHANGE2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🗝️HERMES_ARCHIVE1": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌀SINGULARITY_xXx_EXCHANGE2": {
      "main": [
        [
          {
            "node": "🎱🍁#DARKSIDEMARKETING1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "BILL HEADER INJECTOR": {
      "main": [
        [
          {
            "node": "⭐⭐🍁⭐⭐",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "⭐⭐👑⭐⭐": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🌟GENESIS_xXx_HISTORY1",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🌟GENESIS_xXx_HISTORY",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "🔸 PARADOX_xXx_EXCHANGE",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🧿END_DATETIME_BKK": {
      "main": [
        [
          {
            "node": "🧿END_DATETIME_BKK1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Loop Over Items": {
      "main": [
        [],
        [
          {
            "node": "🌟GENESIS_xXx_HISTORY2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "⭐⭐🍁⭐⭐": {
      "main": [
        [
          {
            "node": "Switch2",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "⭐⭐👑⭐⭐",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🔸 PARADOX_xXx_EXCHANGE": {
      "main": [
        [
          {
            "node": "🌀SINGULARITY_xXx_EXCHANGE1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌟GENESIS_xXx_HISTORY": {
      "main": [
        [
          {
            "node": "🌀SINGULARITY_xXx_EXCHANGE",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌟GENESIS_xXx_HISTORY1": {
      "main": [
        [
          {
            "node": "🗝️HERMES_ARCHIVE2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🌟GENESIS_xXx_HISTORY2": {
      "main": [
        [
          {
            "node": "🗝️HERMES_ARCHIVE",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Wait": {
      "main": [
        [
          {
            "node": "Loop Over Items",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "🧿END_DATETIME_BKK1": {
      "main": [
        [
          {
            "node": "BILL HEADER INJECTOR",
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