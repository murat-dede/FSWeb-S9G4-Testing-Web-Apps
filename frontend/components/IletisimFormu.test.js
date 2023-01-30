import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';
import App from '../App';

test('hata olmadan render ediliyor', () => {
    render(<App />);
});

test('iletişim formu headerı render ediliyor', () => {
render(<IletisimFormu />);
const thingToTest = screen.getByText(/İletişim Formu/i);
expect(thingToTest).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
render(<IletisimFormu/>);
const kullaniciAdi=screen.getByPlaceholderText (/İlhan/i);
userEvent.type(kullaniciAdi,'Gob'); 
const hataIsim = screen.getByText(/ad en az 5 karakter olmalıdır/i);
expect(hataIsim).toBeInTheDocument();
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const kullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    const kullaniciSoyadi = screen.getByPlaceholderText (/Mansız/i);
    const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
userEvent.type(kullaniciAdi,'a');
userEvent.type(kullaniciSoyadi,'a');
userEvent.clear(kullaniciSoyadi);
userEvent.type(Email,'a');
    const hataListesi = screen.getAllByTestId('error');
   
    expect (hataListesi.length).toEqual(3);
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    render(<IletisimFormu />);
    const EmailkullaniciAdi = screen.getByPlaceholderText(/İlhan/i);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
    const submitBtn = screen.getByRole('button');
    userEvent.type(EmailkullaniciAdi,'Murat');
    userEvent.type(kullaniciSoyadi,'D.');
userEvent.click(submitBtn);
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
render(<IletisimFormu/>);
const Email = screen.getByPlaceholderText(/yüzyılıngolcüsü@hotmail.com/i);
userEvent.type(Email,'d');
const hataListesi = await screen.getByTestId('error');
expect(hataListesi).toHaveTextContent('email geçerli bir email adresi olmalıdır.');

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    render(<IletisimFormu/>);
    const kullaniciSoyadi = screen.getByPlaceholderText(/Mansız/i);
    userEvent.type(kullaniciSoyadi,'');
 
   
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

});
