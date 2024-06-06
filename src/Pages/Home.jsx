import React from 'react';
import { useHistory } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';
import Footer from '../components/Footer'
export default function Home() {
  const history = useHistory();

  const navigateToPizzaMenu = () => {
    history.push('/PizzaMenu');
  };

  return (
    <>
      <div className="relative w-full h-screen bg-[#CE2829] flex flex-col justify-between items-center text-white overflow-hidden ">
        <div className="absolute top-0 w-full text-center z-20 mt-4">
          <h1 className="text-5xl font-normal font-Londrina text-[#FFFFFF]">Teknolojik Yemekler</h1>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center z-20">
          <p className="text-4xl mb-2 font-Satisfy font-normal text-[#FDC913]">fırsatı kaçırma</p>
          <p className="text-4xl font-bold mb-4">KOD ACIKTIRIR PIZZA, DOYURUR</p>
          <button
            onClick={navigateToPizzaMenu}
            className="px-6 py-2 w-[194px] h-[56px] bg-[#FDC913] text-black font-bold rounded-full"
          >
            ACIKTIM
          </button>
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
      <div className='IconSection bg-[#FFFFFF] py-8'>
        <ul className='flex gap-[73px] justify-center'>
          <li className='flex items-center gap-5'><a onClick={navigateToPizzaMenu}>Yeni Kore</a><img src="https://s3-alpha-sig.figma.com/img/2a12/f370/cf32c9057ad4d91cff5bfb6cf82c7087?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g-5SWC0scLYkatAKpxr5XFfOxVy3qNfNvtxDcAFATTgQSfGJMvl~HuYtdsMV0tAfUMk3~rQaLGEf~mlFy5pJVWBRoI2ja~yr2jo70cMJsJQCyVCapxd0UHKNjCpBnE3vlxyBskkAlMlayN63NhLA4r8v~TK-yvHntaci~e7FL3r5hVGwYTpBGkXMXEa3LYp5NkyHvr3kAsRrGO0dEvIcXKDPBuK13NlCuVza1xoQjfCTcRgjZOWfHxIXevCQrSlfCqTmCJSvBtbDeN5rXNzCMyrWwpfEa2s6fAhqbw~hopmTuEd~Llc3BGq8fMlM55yrnEVCN8BptOAn2gvZKt2how__" alt="" /></li>
          <li className='flex items-center gap-5'><a onClick={navigateToPizzaMenu}>Pizza</a><img src="https://s3-alpha-sig.figma.com/img/3db5/2209/4bb26a7c6402da2e5f2c39e566b59480?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ovn~bvxMw0K-kbdcafkeFrdee2SR0SxzCYxYBEIEUxnLJyXQU9b310Kr7D6cTMA2ko84x4k7Doq6mkIz1josg7Z~usNQwktwTer4Wlek-mZ5Jxc3Xh-s9MQhTfvby9VFJJGxTJEf5oNM32SLOKTUM9ODAq4c5u3JpvKtWvadKykb4TEqKH9ryCF6k2eRSl2f0LOdtkb07l7rT0nOkjFy~G1X8m3vZgBxGxuxVITT-heqiCjoduXu8g5QF~sQpL0L0LBisVQDBtDQfPMkUXDqKArUIG3co63A-Qvl1e1P4PKwPwGjtR8NhFvYpStbIcgeBQFGFNI7qxdQM855Z9w3Bw__" alt="" /></li>
          <li className='flex items-center gap-5'><a onClick={navigateToPizzaMenu}>Burger</a><img src="https://s3-alpha-sig.figma.com/img/150a/f637/0ef0632109b215d5033b6aaeb40d4e2b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZDsOMA8gqoh8DRrIqNYKfMfvJY3~ZL4bbCRsLjddJD8aP-i71Mut5D5-CCYxO5zkD2TFay0EeNP3yeGPmLEx4huli3l55ooa1QUOujYYuNeM3g0XG4ROacvnaLvD5dqEF-XEoR2qoIxydxFTIW1qeJs1CtImvTkqOtOGt8jmM1qxTJFbIrzsE795Q1wQG5C8IfjToQAL2Ir8ETsTITCmDgoR0icY~ZdRasNCYUBcXYv9jzMIZ0z-pYdoBusEfjkHgKPF4Fs58ahecY7Zy896SowY6-GuxNcxqRrfRHIrVk~bVUgzx4A7MhEq5UuPmrcIMQkYiKb4r8sY8we-5pJUCQ__" alt="" /></li>
          <li className='flex items-center gap-5'><a onClick={navigateToPizzaMenu}>Kızartmalar</a><img src="https://s3-alpha-sig.figma.com/img/1309/5a0d/52da3b4e6fe7e8ad5ab9c0703474762e?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8eswNVHesDI0x4blE2j-F69fMlfZdeIPYa2XF~SlT3MKQ23Hq8BJ3CCn0ZaCBnFLOgYwQxeQKdPN-NTr~NR~R20y8IrDa-59oa9vFdV~FYIXfhvXlvKKrIyyNM~yZFRgx0KZfdAI9Q2hkfS6Afyp5DfD1l~Kc9ULnn6Drdu4SKM2Cnkn-HIVJS3UtyUOAdd2j1L3K3P4Q0o0HrLr-ONyKUtnJjC5jmpybgjigafJSieB~YCjTPKzqOHlUF8OFFg1hL9xJ8sMto827AxHVipR-RtJl3F3QJB7aGP8LEIrX5S6qzl5AuIvyPzNTWQ32wcPV44ospK7k-6dJui0J4hbA__" alt="" /></li>
          <li className='flex items-center gap-5'><a onClick={navigateToPizzaMenu}>Fast Food</a><img src="https://s3-alpha-sig.figma.com/img/a0bd/3d89/c8ba4e927016ed3c458e1e2b03a0fd47?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n5EUBUF82lqiVgSrPrwrlKZhkHQ3fgQWehpX7~ExlBXSln2f42XygCLS9L3PNekSFgxGgs3o8vf7MBCgotFD2EFWeQw~~coJqZGKvNHG94Jk0L5HodGVkFmtxhpe2mNgoDBiUlmDpbc3N4CXnXFj8sQn-ecRC4KrPlElFaUvOmRvSFPvciOzm8BK9Ejuq~9aBx-1gLouv1ZsfhN~A2SYfn3SVGJkfK5kMKtmnDnrfTbKMGlBYjrB3KcC1xqyrioFX6kGhsPf~RxcSSjwRmis2YOCAcvDWu84C7dZsADEazuzSi5orxU4iCONwILRWYJ87CmwDEhp9-TPZR1SduJ0Dw__" alt="" /></li>
          <li className='flex items-center gap-5'><a onClick={navigateToPizzaMenu}>Gazlı İçecek</a><img src="https://s3-alpha-sig.figma.com/img/d0a0/bb89/ccb1059768c63af268f17153b667d4b8?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XHKK4bUkkdJ3iwYEET464EL9qsw9SDuNVpKx-un1mE6ENYc7I9Sw2jNpQuQyAd80uB2PO6LVcfuBOD1YTkldPGjMuBqLFQM0vOHYwMXVNhYVMEIl6ePUQ9Z9C4au-MZli-L8MvN6rAnTOeFvrcQ2Z8Mdu1HX0USsRSHRoxYiwyYr1qkSM262OJwT9TExWqrhOnRjgUpO71cmlj90P32bIzWWka~5WsSCmPG0rmBmWsKSchRn-2faa7Onq00u4TinFrfniAv1hMVGeJLojXHCVfyx1H1gOvIPXKIMkuageJ6Ml1lH4YCS7mz2pRBZ0YqA4crGbOTMBbAMGyfmtC9LA__" alt="" /></li>
        </ul>
      </div>
      <div className='KutuSection flex flex-row-reverse gap-10 justify-center py-32 bg-[#FAF7F2]'>
        <div className='flex flex-col gap-6'>
          <div className='Kutu1 bg-[#292929] w-[636px] h-[255px] rounded-xl flex flex-row just items-center '>
            <div className='flex flex-col-reverse gap-8 pl-6'>
              <a onClick={navigateToPizzaMenu} className='w-[138px] h-[48px] rounded-[50px] bg-[#FFFFFF] flex items-center justify-center text-sm font-semibold text-[#CE2829]' href=""><p>Sipariş Ver</p></a>
              <p className='w-[240px] h-[86px] font-Barlow font-semibold text-3xl text-[#FFFFFF]'>Hackathlon Burger Menü</p>
            </div>
            <img className='w-[auto] h-auto overflow-hidden' src="https://s3-alpha-sig.figma.com/img/6166/ed58/d63154ac0f2a8d7ea2d719fc064bc3f6?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CkuAOPDsFo7BHm87ju4rkInbqPnWOt5ZY7NpvzFEN0205OWjjK9x08zkgSqp97PHaEddVaRAHwzG35qk9E-tgWFC4xW-6XZP-93EPPFkRyvJoetzb9raX9LX6z0dxO3WhlV3TjWIZWc1AwsvWAmZgVl3kzzUZEcVi-WAmc6ISRC2oLbniDivMIrGb04wz36VC1reugD1gk6QUXoQeJKeBiiBGeMo1g1k7cgnvSfcBEwBndI3jU7471Hao5Jn7EClxswyudAzNsovzgdOuYW76BiqyLg-Zbv1D-zcrws8LcwlgzfouKDccA2MCDP41ygoRnJuD1ZG3nhZwX0AV97D2A__" alt="" />
          </div>
          <div className='Kutu2 bg-[#292929] w-[636px] h-[255px] rounded-xl flex flex-row just items-center '>
            <div className='flex flex-col-reverse gap-8 pl-6'>
              <a onClick={navigateToPizzaMenu} className='w-[138px] h-[48px] rounded-[50px] bg-[#FFFFFF] flex items-center justify-center text-sm font-semibold text-[#CE2829]' href=""><p>Sipariş Ver</p></a>
              <p className='w-[240px] h-[86px] font-Barlow font-semibold text-3xl text-[#FFFFFF]'>Hackathlon Burger Menü</p>
            </div>
            <img className=' overflow-hidden' src="https://s3-alpha-sig.figma.com/img/6166/ed58/d63154ac0f2a8d7ea2d719fc064bc3f6?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CkuAOPDsFo7BHm87ju4rkInbqPnWOt5ZY7NpvzFEN0205OWjjK9x08zkgSqp97PHaEddVaRAHwzG35qk9E-tgWFC4xW-6XZP-93EPPFkRyvJoetzb9raX9LX6z0dxO3WhlV3TjWIZWc1AwsvWAmZgVl3kzzUZEcVi-WAmc6ISRC2oLbniDivMIrGb04wz36VC1reugD1gk6QUXoQeJKeBiiBGeMo1g1k7cgnvSfcBEwBndI3jU7471Hao5Jn7EClxswyudAzNsovzgdOuYW76BiqyLg-Zbv1D-zcrws8LcwlgzfouKDccA2MCDP41ygoRnJuD1ZG3nhZwX0AV97D2A__" alt="" />
          </div>
        </div>
        <div className='Kutu3'>
          <div className='w-[636px] h-[538px] rounded-xl bg-[#CE2829]'>
            <span className='flex flex-col-reverse items-start gap-4 absolute pt-8 pl-4 w-[270px]'>
              <a onClick={navigateToPizzaMenu} className='w-[138px] h-[48px] rounded-[50px] bg-[#FFFFFF] flex items-center justify-center text-sm font-semibold text-[#CE2829]' href=""><p>Sipariş Ver</p></a>
              <p className='text-xl font-Barlow font-semibold text-[#FFFFFF]'>Position:Absolute Acı Burger</p>
              <p className='font-Quattrocento text-[68px] text-[#FFFFFF] font-bold'>Özel Lezzetus</p>
            </span>
            <img className='w-[636px] h-[538px]' src="https://s3-alpha-sig.figma.com/img/c436/3ab0/a2144978475fda5e250917960da4ea56?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y11gCKVHqXkfsTzNip-UGGDRMuMi36M8duxEASrHPlA8yb5dejZTj9v3iBCYn7i8wLHPF~Dhw3GDn0nD4alfdaJMamfSx9wOVBYhohRyI4ul77cX7Xd~bMrmLsbDW-s9s8n22c2jN~xD045MThmgZ4b5VqVSqe0JtE2aD9Gdy-PFmy3Hu9GavZcSZLVzsN-LLHljLlvq83lDC7fxlibrhY8DbXKBMYJ94ODvd40GB7bb6JcSCf2s6kvrnLfHYAED0mi3LhzwPDOuTfY1Ihdw-AwWi32mDWQLWgW~dx6J-O7LoyDfmprSW7gWxMdb5YMb6LGmUWne8~43T4Xm3asQaw__" alt="" />
          </div>
        </div>
      </div>
      <div className='CokSatan bg-[#FAF7F2]'>
        <div className='SatanText flex flex-col items-center'>
          <p className='font-Satisfy font-normal text-[32px] text-[#CE2829]'>en çopk paketlenen menüler</p>
          <p className='font-Barlow font-semibold text-[42px] text-[#292929]'>Acıktıran Kodlara Doyuran Lezzetler</p>
        </div>
        <div className='SatanButton'>
          <span className='flex gap-8 justify-center py-12'>
            <button onClick={navigateToPizzaMenu} className='w-[201px] h-[80px] rounded-[50px] bg-[#FFFFFF] flex justify-center items-center'><img src="https://s3-alpha-sig.figma.com/img/2a12/f370/cf32c9057ad4d91cff5bfb6cf82c7087?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g-5SWC0scLYkatAKpxr5XFfOxVy3qNfNvtxDcAFATTgQSfGJMvl~HuYtdsMV0tAfUMk3~rQaLGEf~mlFy5pJVWBRoI2ja~yr2jo70cMJsJQCyVCapxd0UHKNjCpBnE3vlxyBskkAlMlayN63NhLA4r8v~TK-yvHntaci~e7FL3r5hVGwYTpBGkXMXEa3LYp5NkyHvr3kAsRrGO0dEvIcXKDPBuK13NlCuVza1xoQjfCTcRgjZOWfHxIXevCQrSlfCqTmCJSvBtbDeN5rXNzCMyrWwpfEa2s6fAhqbw~hopmTuEd~Llc3BGq8fMlM55yrnEVCN8BptOAn2gvZKt2how__" alt="" />Ramen</button>
            <button onClick={navigateToPizzaMenu} className='w-[201px] h-[80px] rounded-[50px] bg-[#FFFFFF] flex justify-center items-center'><img src="https://s3-alpha-sig.figma.com/img/3db5/2209/4bb26a7c6402da2e5f2c39e566b59480?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ovn~bvxMw0K-kbdcafkeFrdee2SR0SxzCYxYBEIEUxnLJyXQU9b310Kr7D6cTMA2ko84x4k7Doq6mkIz1josg7Z~usNQwktwTer4Wlek-mZ5Jxc3Xh-s9MQhTfvby9VFJJGxTJEf5oNM32SLOKTUM9ODAq4c5u3JpvKtWvadKykb4TEqKH9ryCF6k2eRSl2f0LOdtkb07l7rT0nOkjFy~G1X8m3vZgBxGxuxVITT-heqiCjoduXu8g5QF~sQpL0L0LBisVQDBtDQfPMkUXDqKArUIG3co63A-Qvl1e1P4PKwPwGjtR8NhFvYpStbIcgeBQFGFNI7qxdQM855Z9w3Bw__" alt="" />Pizza</button>
            <button onClick={navigateToPizzaMenu} className='w-[201px] h-[80px] rounded-[50px] bg-[#FFFFFF] flex justify-center items-center'><img src="https://s3-alpha-sig.figma.com/img/150a/f637/0ef0632109b215d5033b6aaeb40d4e2b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZDsOMA8gqoh8DRrIqNYKfMfvJY3~ZL4bbCRsLjddJD8aP-i71Mut5D5-CCYxO5zkD2TFay0EeNP3yeGPmLEx4huli3l55ooa1QUOujYYuNeM3g0XG4ROacvnaLvD5dqEF-XEoR2qoIxydxFTIW1qeJs1CtImvTkqOtOGt8jmM1qxTJFbIrzsE795Q1wQG5C8IfjToQAL2Ir8ETsTITCmDgoR0icY~ZdRasNCYUBcXYv9jzMIZ0z-pYdoBusEfjkHgKPF4Fs58ahecY7Zy896SowY6-GuxNcxqRrfRHIrVk~bVUgzx4A7MhEq5UuPmrcIMQkYiKb4r8sY8we-5pJUCQ__" alt="" />Burger</button>
            <button onClick={navigateToPizzaMenu} className='w-[201px] h-[80px] rounded-[50px] bg-[#FFFFFF] flex justify-center items-center'><img src="https://s3-alpha-sig.figma.com/img/1309/5a0d/52da3b4e6fe7e8ad5ab9c0703474762e?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=S8eswNVHesDI0x4blE2j-F69fMlfZdeIPYa2XF~SlT3MKQ23Hq8BJ3CCn0ZaCBnFLOgYwQxeQKdPN-NTr~NR~R20y8IrDa-59oa9vFdV~FYIXfhvXlvKKrIyyNM~yZFRgx0KZfdAI9Q2hkfS6Afyp5DfD1l~Kc9ULnn6Drdu4SKM2Cnkn-HIVJS3UtyUOAdd2j1L3K3P4Q0o0HrLr-ONyKUtnJjC5jmpybgjigafJSieB~YCjTPKzqOHlUF8OFFg1hL9xJ8sMto827AxHVipR-RtJl3F3QJB7aGP8LEIrX5S6qzl5AuIvyPzNTWQ32wcPV44ospK7k-6dJui0J4hbA__" alt="" />French fries</button>
            <button onClick={navigateToPizzaMenu} className='w-[201px] h-[80px] rounded-[50px] bg-[#FFFFFF] flex justify-center items-center'><img src="https://s3-alpha-sig.figma.com/img/a0bd/3d89/c8ba4e927016ed3c458e1e2b03a0fd47?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=n5EUBUF82lqiVgSrPrwrlKZhkHQ3fgQWehpX7~ExlBXSln2f42XygCLS9L3PNekSFgxGgs3o8vf7MBCgotFD2EFWeQw~~coJqZGKvNHG94Jk0L5HodGVkFmtxhpe2mNgoDBiUlmDpbc3N4CXnXFj8sQn-ecRC4KrPlElFaUvOmRvSFPvciOzm8BK9Ejuq~9aBx-1gLouv1ZsfhN~A2SYfn3SVGJkfK5kMKtmnDnrfTbKMGlBYjrB3KcC1xqyrioFX6kGhsPf~RxcSSjwRmis2YOCAcvDWu84C7dZsADEazuzSi5orxU4iCONwILRWYJ87CmwDEhp9-TPZR1SduJ0Dw__" alt="" />Fast food</button>
            <button onClick={navigateToPizzaMenu} className='w-[201px] h-[80px] rounded-[50px] bg-[#FFFFFF] flex justify-center items-center'><img src="https://s3-alpha-sig.figma.com/img/d0a0/bb89/ccb1059768c63af268f17153b667d4b8?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XHKK4bUkkdJ3iwYEET464EL9qsw9SDuNVpKx-un1mE6ENYc7I9Sw2jNpQuQyAd80uB2PO6LVcfuBOD1YTkldPGjMuBqLFQM0vOHYwMXVNhYVMEIl6ePUQ9Z9C4au-MZli-L8MvN6rAnTOeFvrcQ2Z8Mdu1HX0USsRSHRoxYiwyYr1qkSM262OJwT9TExWqrhOnRjgUpO71cmlj90P32bIzWWka~5WsSCmPG0rmBmWsKSchRn-2faa7Onq00u4TinFrfniAv1hMVGeJLojXHCVfyx1H1gOvIPXKIMkuageJ6Ml1lH4YCS7mz2pRBZ0YqA4crGbOTMBbAMGyfmtC9LA__" alt="" />Soft drinks</button>
          </span>
        </div>
        <div></div>

        <ProductList />
        <Footer />

      </div>
    </>
  );
}
