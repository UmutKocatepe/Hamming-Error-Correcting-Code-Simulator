function generateInputFields() {
    const bitCount = document.getElementById('bitCount').value;
    const dataInputSection = document.getElementById('dataInputSection');
    const dataInputs = document.getElementById('dataInputs');
    dataInputs.innerHTML = '';

    for (let i = 0; i < bitCount; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '0';
        input.max = '1';
        input.id = 'bit' + i;
        dataInputs.appendChild(input);
    }

    dataInputSection.style.display = 'block';
    
}

function calculateHammingCode() {
    const bitCount = document.getElementById('bitCount').value;
    
    if (bitCount == 4) {
        calculateHammingCodeFor4Bits();
    } else if (bitCount == 8) {
        calculateHammingCodeFor8Bits();
    } else if (bitCount == 16) {
        calculateHammingCodeFor16Bits();
    } else {
        alert("Lütfen 4, 8 veya 16 bitlik bir değer giriniz.");
    }
}

function calculateHammingCodeFor4Bits() {
    let a = [10];

    a[3] = parseInt(document.getElementById('bit0').value);
    a[5] = parseInt(document.getElementById('bit1').value);
    a[6] = parseInt(document.getElementById('bit2').value);
    a[7] = parseInt(document.getElementById('bit3').value);

    a[1] = a[3] ^ a[5] ^ a[7]; // Parity bitleri
    a[2] = a[3] ^ a[6] ^ a[7];
    a[4] = a[5] ^ a[6] ^ a[7];

    displayHammingCode(a.slice(0, 8));

    // Yapay hata oluştur
    const position = Math.floor(Math.random() * 7) + 1;
    a[position] ^= 1;
    displayFaultyCode(a.slice(0, 8), position);

    // Hata tespiti ve düzeltme
    let ca1 = a[4] ^ a[5] ^ a[6] ^ a[7];
    let ca2 = a[2] ^ a[3] ^ a[6] ^ a[7];
    let ca3 = a[1] ^ a[3] ^ a[5] ^ a[7];
    let x = ca1 * 4 + ca2 * 2 + ca3 * 1;

    if (a[x] == 1) {
        a[x] = 0;
    } else {
        a[x] = 1;
    }

    displayCorrectedCode(a.slice(0, 8), x);
}

function calculateHammingCodeFor8Bits(){
    let b = [13]; 
    let cb1,cb2,cb3,cb4;

    let index = 0;
    for(let i=3;i<13;i++){
        if(i==4 || i==8)
            continue;
        else
            b[i] = parseInt(document.getElementById(`bit${index}`).value);
        index++;

    }

    cb1=b[3]^b[5]^b[7]^b[9]^b[11]; // parity bitlerini bulmak için xor'luyoruz
    b[1] = cb1;

    cb2=b[3]^b[6]^b[7]^b[10]^b[11];
    b[2] = cb2;

    cb3=b[4]^b[5]^b[6]^b[7]^b[12];
    b[4] = cb3;

    cb4=b[9]^b[10]^b[11]^b[12];
    b[8] = cb4;

    displayHammingCode(b.slice(0, 13)); // Hamming kodu yazdırma

    // Yapay hata oluştur
    const position = Math.floor(Math.random() * 12)+1;
    b[position] ^= 1;
    displayFaultyCode(b.slice(0, 13), position);

    // Hata tespiti ve düzeltme
    let ecb1 = b[8]^b[9]^b[10]^b[11]^b[12]; // error correction bits 
    let ecb2 = b[4]^b[5]^b[6]^b[7]^b[12];
    let ecb3 = b[2]^b[3]^b[6]^b[7]^b[10]^b[11];
    let ecb4 = b[1]^b[3]^b[5]^b[7]^b[9]^b[11];

    let x = ecb1*8 + ecb2*4 + ecb3*2 + ecb4*1 ;

    if (b[x] == 1) {
        b[x] = 0;
    } else {
        b[x] = 1;
    }

    displayCorrectedCode(b.slice(0,13), x);//Hata duzeltilmis kodu yazdırma
    
}

function calculateHammingCodeFor16Bits(){
    let c = [22]; //22 cases
    let cc1,cc2,cc3,cc4,cc5;

    let index = 0; // Data bitleri
    for (let i = 3; i < 22; i++) {
        if (i == 4 || i == 8 || i == 16) 
            continue;
        else{
            c[i] = parseInt(document.getElementById(`bit${index}`).value);
        }
        index++;
    }


    cc1 = c[3]^c[5]^c[7]^c[9]^c[11]^c[13]^c[15]^c[17]^c[19]^c[21];  // Parity bitleri
    c[1] = cc1;

    cc2 = c[3]^c[6]^c[7]^c[10]^c[11]^c[14]^c[15]^c[18]^c[19];
    c[2] = cc2;
    
    cc3 = c[5]^c[6]^c[7]^c[12]^c[13]^c[14]^c[15]^c[20]^c[21];
    c[4] = cc3;
    
    cc4 = c[9]^c[10]^c[11]^c[12]^c[13]^c[14]^c[15];
    c[8] = cc4;
   
    cc5 = c[17]^c[18]^c[19]^c[20]^c[21];
    c[16] = cc5;

    displayHammingCode(c.slice(0,22)); // Hamming kodu yazdırma

    // Yapay hata oluştur
    const position = Math.floor(Math.random() * 21)+1;
    c[position] ^= 1;
    displayFaultyCode(c.slice(0,22), position);

    // Hata tespiti ve düzeltme 
    let ecc1 = c[16] ^ c[17] ^ c[18] ^ c[19] ^ c[20] ^ c[21]; // error correction bits
    let ecc2 = c[8] ^ c[9] ^ c[10] ^ c[11] ^ c[12] ^ c[13] ^ c[14] ^ c[15];
    let ecc3 = c[4] ^ c[5] ^ c[6] ^ c[7] ^ c[12] ^ c[13] ^ c[14] ^ c[15] ^ c[20] ^ c[21];
    let ecc4 = c[2] ^ c[3] ^ c[6] ^ c[7] ^ c[10] ^ c[11] ^ c[14] ^ c[15] ^ c[18] ^ c[19];
    let ecc5 = c[1] ^ c[3] ^ c[5] ^ c[7] ^ c[9] ^ c[11] ^ c[13] ^ c[15] ^ c[17] ^ c[19] ^ c[21];
    let x = ecc1*16 + ecc2*8 + ecc3*4 + ecc4*2 + ecc5*1;
    
    if (c[x] == 1) {
        c[x] = 0;
    } else {
        c[x] = 1;
    }

    displayCorrectedCode(c.slice(0,22));//Hata duzeltilmis kodu yazdırma

}


function displayHammingCode(hammingCode) {
    document.getElementById('hammingCode').innerText = hammingCode.slice(1).join(' ');
    document.getElementById('outputSection').style.display = 'block';
}

function displayFaultyCode(hammingCode, position) {
    document.getElementById('faultyCode').innerText = hammingCode.slice(1).join(' ');
    document.getElementById('errorPosition').innerText = position;
}

function displayCorrectedCode(hammingCode, errorPosition) { 
    document.getElementById('correctedCode').innerText = hammingCode.slice(1).join(' ');
}

