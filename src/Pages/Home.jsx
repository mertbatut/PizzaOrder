import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="relative w-full h-screen bg-[#CE2829] flex flex-col justify-between items-center text-white overflow-hidden">
        <div className="absolute top-0 w-full text-center z-20 mt-4">
          <h1 className="text-5xl font-normal font-Londrina">Teknolojik Yemekler</h1>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center z-20">
          <p className="text-4xl mb-2 font-Satisfy font-normal text-[#FDC913]">fırsatı kaçırma</p>
          <p className="text-4xl font-bold mb-4">KOD ACIKTIRIR PIZZA, DOYURUR</p>
          <a href="#">
            <button className="px-6 py-2 w-[194px] h-[56px] bg-[#FDC913] text-black font-bold rounded-full">
              ACIKTIM
            </button>
          </a>
        </div>
        <img
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 object-contain"
          src="https://s3-alpha-sig.figma.com/img/2b78/c96a/4a4acb450e3bbb3750c05c017efa1f61?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NZhvKB0lpoLGgAB66kypq0PQzeT6wHC5VXopuIb9433NcTnZhhaSKofIjayKogdW0DKJvYHiLAXgEp0fnGD6Ok5nsV01P7N2azMdAgStqhFAMkKtjBwbPE49CbCh~qI8C1y9HUanDua-f7dCLaJjjr8f2ZLQZMSQcyTgMS6PvHwlIxaidHt6D8TZVd--JuwOraRnE6DpMMllPmIfdlxrrsSTz3NeAsIYKOt3PDItc3XK0MC9DlaimUQA5bEGYa9s9UBvBl1H~NPKGy2o4FbOXmNGs-1HMpkNZ3A-e4koyCGdQka8a22yxaVZ5cj7jYRiTMOPN2EQvmgGFFIZGdPliw__"
          alt="Pizza Bottom"
        />
        <img
          className="absolute top-0 left-0 z-0 w-full h-full object-cover"
          src="https://s3-alpha-sig.figma.com/img/a770/35a9/df7ba412f5e1582f8e31e2e22182bd40?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n~gRjKTTvZQQzxsi~vWVwETQUcURvlHaCmwq6p-~ht4zMm89HJ5P3JKRGWX-BnrZRKXBFh1TZ28VPLX9H6TPM-1Czr-zGjDFno5NT~Ntv835xHNHJVnvTSJLAiguuWxrFNjy2nS0~iA~YsUbT3I5CFhnxBY-JqFAaYp7HoySdolGlGM3fm6T2nyAY~wSsYy8D16t4urNw7wizD7vk78k8D7227iEXfG28olbSInvU0nR8w2C8rfe9WhLBJ91bpqbakoDebsxI1-5u26XZxthGSebzgkaEa8Iyf59o0iqlQzOJs56HJlZ3kynt2vKNT43YyZpRFAf9cswmP4FQyf-NA__"
          alt="Background"
        />
        <img
          className="absolute top-0 left-0 z-10 w-full h-full object-contain"
          src="https://s3-alpha-sig.figma.com/img/c7c2/d1fe/2b00c87f8544a38ec58cc920e97751dd?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iLYRWm6xztHEMvijQz~RM0jrTF09QIiFOHhJ~lMnj2Gqs-5Cl7ANVEW0lMhBxmnFaGhg4M5y~EmVapzadWMSVhb7JARz5HlqTIN9DI5RWr20zXvcZTyL9~vIn9ZZZTs5SweNMMrN5bDjFfw~e3mDwW~CfEMoWdwENkbNdGJd1Yi~kpV~JKTShI04eUVdTj-eh1oJptLdtml-InLym-eql5lQ0QbxkBhYPXTbiML5OQMQoHEj4EFfQdL5n5uRnxDg2Df4WzdqXyraKqROjrXkCl-fNZFrhSAayfR~H2sDz0OueXkSP0PilAiWq5VLrwFqH1qtCqKKRe4WcKrBCDVViw__"
          alt="Pizza Top"
        />
        <img
          className="absolute top-0 left-0 z-10 object-contain"
          src="https://s3-alpha-sig.figma.com/img/5d5a/38aa/92597c1bd692a4f8656452f8f6dddf55?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AbMzECwQMyxniAkdHL7aK5SD3geF0tXxs915fl8B5M3f42FxJ7hnIZiuJycoggNFgmSpJ3d00-MOPgTunGUR7KU04kpWDqr2V8Apa~XAukgbSzgrDrEF~Rfs3NUlH~ABSBZ-pNsekHj0GeobiVAHcg3zCxG5f5J2pOt9AfR9BM8TXoAWaU0GLtcokMTgdkF5WEYLKloet30x3qTv9oRUuv39Y~IoOvzBV2EsOe~icKKDBYg9QxybJwP4XNvaACiafIuCAS909L1ZnunVw29u0dmc2br2EzrOAIvYxp1Kr29~5e1Kv70kEkNyx0Vfs1K3u2vt-CKoGcea8Cahtm5lyw__"
          alt="Pizza Ingredients"
        />
      </div>
    );
  }
}
