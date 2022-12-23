# TestJavan

Di repository ini terdapat 2 folder : 
1. frontend : Berisikan angular apps, yang dimana isinya adalah Test teknis untuk Angular developer dan NodeJS Developer.
2. functions : Berisikan fungsi API NodeJS, yang dimana isinya adalah Test teknis untuk NodeJS Developer.
3. File schema SQL, Untuk Test Teknis NodeJS Developer

Cara menjalankan program : 
1. Untuk frontend, cukup dengan perintah `ng serve`, maka development server akan dimulai di localhost:4200
2. Untuk functions, cukup dengan perintah `node app.js` atau `nodemon app.js`, port akan dibuka di port 5000

Untuk menjawab pertanyaan di soal test teknis angular : 

Menurut saya tampilan yang bisa di buat angular tapi menantang yaitu tampilan yang melakukan perubahan data dengan sering dan mencangkup banyak component, misalnya perubahan yang dilakukan oleh parent component dan child component harus mengupdate data berdasarkan perubahan yang terjadi atau sebaliknya. Semakin sering perubahan terjadi, maka semakin besar kemungkinan terjadi kesalahan atau mungkin memory leak dari sisi client.
