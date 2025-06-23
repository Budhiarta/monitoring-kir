import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.device.createMany({
    data: [
      { devicename: "Gas Analizer" },
      { devicename: "Smoke Tester" },
      { devicename: "Axle Ply Detector" },
      { devicename: "Side Slip" },
      { devicename: "Head Light Tester" },
      { devicename: "Speedometer Tester" },
      { devicename: "Brake Axle Load Tester" },
      { devicename: "Sound Level Tester" },
      { devicename: "Tint Tester" },
      { devicename: "Depth Thread/Kedalaman " },
    ],
    skipDuplicates: true,
  });

  await prisma.sparePart.createMany({
    data: [
      { name: "Filter Udara", qty: 1 },
      { name: "Baterai AA", qty: 1 },
      { name: "Filter Partikulat", qty: 1 },
    ],
  });

  // note
  // 1 = harian
  // 2 = mingguan
  // 3 = bulanan

  await prisma.task.createMany({
    data: [
      {
        activity: "Bersihkan bagian dari alat uji",
        frequency: 1,
        deviceId: 2,
      },
      {
        activity:
          "Bersihkan 2 buah sensor (Transmitter & Receiver) dan jangan sentuh sensor  dengan tangan",
        frequency: 1,
        deviceId: 2,
      },
      {
        activity: "Bersihkan probe dengan angin kompresor",
        frequency: 1,
        deviceId: 2,
      },
      {
        activity: "Bersihkan selang probe dengan angin kompresor",
        frequency: 1,
        deviceId: 2,
      },
      {
        activity:
          "Periksa kondisi kabel listrik pastikan kabel tidak ada yang terkelupas",
        frequency: 1,
        deviceId: 2,
      },
      {
        activity: "Periksa kondisi tinta dan kertas printer",
        frequency: 1,
        deviceId: 2,
      },
      {
        activity: "Periksalah dan bersihkan selang dengan angin kompresor",
        frequency: 2,
        deviceId: 2,
      },
      {
        activity: "Bersihkan sensor-sensor dari debu",
        frequency: 2,
        deviceId: 2,
      },
      {
        activity: "Periksa kondisi tinta dan kertas printer",
        frequency: 2,
        deviceId: 2,
      },
      {
        activity: "Lakukan kalibrasi sesuai dengan waktu yang telah ditentukan",
        frequency: 3,
        deviceId: 2,
      },
      {
        activity: "Lakukan servis berkala",
        frequency: 3,
        deviceId: 2,
      },
      {
        activity: "Bersihkan bagian dari alat uji co-hc tester",
        frequency: 1,
        deviceId: 1,
      },
      {
        activity: "Bersihkan filter dengaan angin kompresor",
        frequency: 1,
        deviceId: 1,
      },
      {
        activity: "Bersihkan probe dengan angin kompresor",
        frequency: 1,
        deviceId: 1,
      },
      {
        activity: "Periksalah kabel listrik",
        frequency: 1,
        deviceId: 1,
      },
      {
        activity: "Bersihkan selang probe dengan angin  kompresor",
        frequency: 1,
        deviceId: 1,
      },
      {
        activity: "Bersihkan dengan angin kompresor",
        frequency: 2,
        deviceId: 1,
      },
      {
        activity: "Periksa kondisi tinta dan kertas print",
        frequency: 2,
        deviceId: 1,
      },
      {
        activity: "Ganti filter bila sudah tidak bisa dibersihkan",
        frequency: 3,
        deviceId: 1,
      },
      {
        activity: "Bersihkan alat dari kotoran dan debu",
        frequency: 1,
        deviceId: 5,
      },
      {
        activity:
          "Periksa kondisi kelistrikan dan pastikan kabel tidak dalam kondisi terjepit dan terkelupas",
        frequency: 1,
        deviceId: 5,
      },
      {
        activity: "Periksa kondisi kabel dan port-port sambungan",
        frequency: 1,
        deviceId: 5,
      },
      {
        activity: "Periksa rel dan bersihkan",
        frequency: 1,
        deviceId: 5,
      },
      {
        activity: "Periksa kondisi roda gerak alat",
        frequency: 1,
        deviceId: 5,
      },
      {
        activity: "Bersihkan sensor-sensor dari debu dan kotoran",
        frequency: 1,
        deviceId: 5,
      },
      {
        activity: "Periksa lensa dan bersihkan",
        frequency: 2,
        deviceId: 5,
      },
      {
        activity: "Periksa kondisi rel dan lumasi dengan pelumas",
        frequency: 2,
        deviceId: 5,
      },
      {
        activity: "Bersihkan lensa luar dan dalam",
        frequency: 3,
        deviceId: 5,
      },
      {
        activity: "Periksa roda-roda dan pelumasnya, tambahkan bila diperlukan",
        frequency: 3,
        deviceId: 5,
      },
      {
        activity:
          "Periksa kondisi kelistrikan dan pastikan kabel tidak dalam kondisi terjepit",
        frequency: 1,
        deviceId: 4,
      },
      {
        activity:
          "Periksa kondisi tabel dan port sambungan CPU dan kelistrikan",
        frequency: 1,
        deviceId: 4,
      },
      {
        activity:
          "Periksa kondisi kebersihan papan side slip dan pastikan tidak ada skrap atau kotoran yang mengganjal",
        frequency: 1,
        deviceId: 4,
      },
      {
        activity: "Periksa dan lihat kondisi dari bagian elektronik",
        frequency: 1,
        deviceId: 4,
      },
      {
        activity: "Bersihkan papan side slip dengan kain yang dibasahi solar",
        frequency: 2,
        deviceId: 4,
      },
      {
        activity:
          "Periksa kondisi kelistrikan dan pastikan kabel tidak dalam kondisi terjepit",
        frequency: 3,
        deviceId: 4,
      },
      {
        activity:
          "Periksa kondisi kelistrikan dan pastikan kabel tidak terkelupas",
        frequency: 1,
        deviceId: 7,
      },
      {
        activity:
          "Periksa kondisi kabel dan port sambungan CPU dan kelistrikan",
        frequency: 1,
        deviceId: 7,
      },
      {
        activity: "Periksa dan bersihkan kerangka dan roller",
        frequency: 1,
        deviceId: 7,
      },
      {
        activity: "Periksaan dan bersihkan sensor",
        frequency: 1,
        deviceId: 7,
      },
      {
        activity: "Periksa kondisi kebersihan roller dari debu",
        frequency: 1,
        deviceId: 7,
      },
      {
        activity:
          "Bersihkan sensor-sensor yang ada pada alat uji dengan air gun",
        frequency: 2,
        deviceId: 7,
      },
      {
        activity: "Bersihkan kerangka dan roller dengan kain dan solar",
        frequency: 2,
        deviceId: 7,
      },
      {
        activity:
          "Periksa kondisi bearing dan segera ganti apabila terjadi keausan",
        frequency: 3,
        deviceId: 7,
      },
      {
        activity: "Periksa kondisi rantai serta gear box pada motor penggerak",
        frequency: 3,
        deviceId: 7,
      },
      {
        activity: "Periksa kondisi kebocoran pada selang minyak",
        frequency: 3,
        deviceId: 7,
      },
      {
        activity:
          "Periksa kondisi kelistrikan dan pastikan kabel tidak dalam kondisi terjepit dan terkelupas",
        frequency: 1,
        deviceId: 6,
      },
      {
        activity:
          "Periksa kondisi kabel dan port sambungan CPU dan penggerak mekanik",
        frequency: 1,
        deviceId: 6,
      },
      {
        activity: "Periksa kebersihan roller dan lift dari debu",
        frequency: 1,
        deviceId: 6,
      },
      {
        activity: "Bersihkan sensor dari debu dan kotoran",
        frequency: 1,
        deviceId: 6,
      },
      {
        activity:
          "Bersihkan roller dan lift mekanik dari skrap dan kotoran yang menempel",
        frequency: 2,
        deviceId: 6,
      },
      {
        activity:
          "Periksa pelumasan pada banatalan-bantalan roller di alat uji speedometer tambahkan jika diperlukan",
        frequency: 3,
        deviceId: 6,
      },
      {
        activity: "Periksa kekencangan baut pada bantalan-bantalan roller",
        frequency: 3,
        deviceId: 6,
      },
      {
        activity: "Bersihkan lubang pit dan seluruh peralatan uji",
        frequency: 3,
        deviceId: 6,
      },
      {
        activity: "Bersihkan bagian dari alat uji",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity:
          "Periksa kondisi kelistrikan dan pastikan kabel tidak dalam kondisi terjepit dan terkelupas",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity: "Periksa kondisi lampu senter",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity: "Periksa kondisi remote/tombol operasi",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity: "Periksa dan bersikan papan pijak",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity:
          "Periksa dan bersihkan selang minyak dan tekanan angin 7-8 bar pada indikator",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity: "Periksa kebersihan motor pompa hidrolik",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity: "Periksa kondisi kebersihan kolong uji",
        frequency: 1,
        deviceId: 3,
      },
      {
        activity: "Periksa kebersihan selang angin dan hidrolik",
        frequency: 2,
        deviceId: 3,
      },
      {
        activity: "Bersihkan papan pijak dengan kain dan solar",
        frequency: 2,
        deviceId: 3,
      },
      {
        activity: "Periksa kebocoran pada selang angin/hidrolik",
        frequency: 3,
        deviceId: 3,
      },
      {
        activity: "Bersihkan kotoran pada tombol on/off",
        frequency: 3,
        deviceId: 3,
      },
      {
        activity: "Tambahkan oli bila kurang",
        frequency: 3,
        deviceId: 3,
      },
      {
        activity: "Bersihkan bagian bawah papan pijak",
        frequency: 3,
        deviceId: 3,
      },
      {
        activity: "Perhatikan kondisi display",
        frequency: 1,
        deviceId: 8,
      },
      {
        activity:
          "Lakukan pembersihan setelah digunakan menggunakan kain halus",
        frequency: 1,
        deviceId: 8,
      },
      {
        activity: "Amati kondisi baterai jika akan digunakan",
        frequency: 1,
        deviceId: 8,
      },
      {
        activity: "Lepas baterai jika lama tidak digunakan",
        frequency: 1,
        deviceId: 8,
      },
      {
        activity: "Perhatikan kondisi display",
        frequency: 1,
        deviceId: 9,
      },
      {
        activity:
          "Lakukan pembersihan setelah digunakan menggunakan kain halus",
        frequency: 1,
        deviceId: 9,
      },
      {
        activity: "Amati kondisi baterai jika akan digunakan",
        frequency: 1,
        deviceId: 9,
      },
      {
        activity: "Lepas baterai jika lama tidak digunakan",
        frequency: 1,
        deviceId: 9,
      },
      {
        activity: "Perhatikan kondisi display",
        frequency: 1,
        deviceId: 10,
      },
      {
        activity:
          "Lakukan pembersihan setelah digunakan menggunakan kain halus",
        frequency: 1,
        deviceId: 10,
      },
      {
        activity: "Amati kondisi baterai jika akan digunakan",
        frequency: 1,
        deviceId: 10,
      },
      {
        activity: "Lepas batrai jika lama tidak digunakan",
        frequency: 1,
        deviceId: 10,
      },
    ],
  });
}

main().finally(() => prisma.$disconnect());
