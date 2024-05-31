import React from 'react'

export default function Footer() {
  return (
    <>
   <div className='FooterTotal flex flex-col-reverse bg-[#1A1A1A]'>
    <div className='FooterFirst'>
        <div className="FooterDiv">
            <ul className='flex justify-around flex-row-reverse gap-[40rem]'>
                <img  src="./images/twitter.svg" alt="" />
                <p className='py-8 font-normal font-Barlow text-base text-[#FFFFFF]'>© 2023 Teknolojik Yemekler</p>
            </ul>
        </div>
    </div>
    <hr/>
    
    <div className='FooterSecond flex flex-row-reverse justify-evenly items-center py-20'>
        <div className='ImageBox flex flex-col-reverse'>
            <ul className='w-[302px] h-[212px] flex flex-col flex-wrap gap-4 mt-8'>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/6604/67f8/a72f04200cdc712df4da9dbe5d2cc740?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m9d6h0pp5f~jMuQNj7Zuc3KqQDbiLnnyzHeY0wYTpfa2Oba8W1qLNI2UW-h85qMi-42zNhxaqXNpubFA82zRf9T1SCxLQATyKW6NbfFauy4ddnErxwy3Sm1lT4NbAqcgJ6Gv3XYF4g6v8PX40qba7mWHtiggR5CKgpCMaWI1vQ8I1EFpc3IuzI9k1xF7MTMIuBh8Y43OVHsk4XuDvqemg2DHbZPkNFln4LJUDnEoelbJW7oXoKcn9xpapR96Goiv2FHR-szdAcppS3AWGyY7t8a2Kn-VbHfKlAyaSxRA4yFEaWlJgyytYU04RKDgZxq7w4CCyC-hwTh1BG9DRaaOMQ__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/fac5/a071/ac57e061246eb6dc85915d553dd69139?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eUDw~LqdBNbNI4c7QCQzsAia7kET5LTtm7LwJ1QHQUe4D1GXb26EyMEiasO5xnC27IztUgsAq2Cc0djodEwrmHeCW2x9Lb7ofUZamu-8gB08aofcK0MUH7Wf4QQ3xdySQn16snqW5Mpft6n8r5DGSZNTcn15ak3ahN4gRdHB-1ya1NXhRkqO4WJ7QeP2xsldNFbn-minsz0U-0KcaqucCQC-N6QFFKXf~Ddhsz4XY56Tworb8C~9Nu8uozjtLHXMJFGyyDRw4fusgYcIwUZg38nVWdiBx0vmlvjCadHfQoVd3PfC-5RrXeI-hdrHCmkYBRY3hils213IvJU0dJh2qQ__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/cff3/c2ac/3faa7e879f7e8774c45ed7c70887e593?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MbAszjVSYmdvuTc~FM3EFRvwS9FUXPk-CBjsPHP~hSOr6JAuEwkU99I0r6ncuEBL9KJ~Qdp6Zz7m7detfGQLLUKLipqtj3RrqDcSVk7Q-WniRbw0iSlronwCF8avRTYLtLPbaQwJGFMsI6HW1G3RsaDGoXjRCWux4HtmP0R5DmR~uEIF~zMeQ~Ae~RX63E5e1WjrdQUJbk4r1pFQPEUa717tcUkEFEdBJQO-yQ0QyJGnV4vroR5372A-gZ2DbXKboa8VZUlvP2ldPKpsSX4uIbgmHSJlpPCAVGwhY~0AqQu9BvAECqGYEFHt-DfH84Yy3L1D1brQarH6oS7oQNdbGw__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/758e/c71c/3340af96d90783c9a2fc83d7eba5e435?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b1kU7pKmfZLubPrJkXdTH~PihUOcuqC2bZShhILiV-BYFCrRWmZ9NBvgCkO5uurZlwZgn0QJmh0AwF2i56gK02qAR6CdmG~ocoQ9sPbuYojov4rYnnhT0Iq4rMRmcbWtQGEfXeDHxXNWv9~juiQxecbawBwC6oItun4eKGI2qOeitSSvu5VB3YYA7XP1toWDh83HKstMUQ59ivME1DCGIyIAqfOpoZGuyRAaNkeHTKaRgq1X~91g3gqyPCkz~x~YC0qYlcpZOxyZRcH2GSLj48tNYnUFlr875CkytZygKRO-KQLRh-09SRyGpznUfkiDmdNCe2Scr~h3nfTsrp-V3g__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/ab8f/b0dd/d3d48d4bfbb94368f413eea6e51a731e?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SLGGA-r57kjuwPpN8vtG4UbBT8xyjTM--av-8EJw70DUEblxhlTjwTu37AC9WKy3Ij4nerba5a27~vETW1CDlRH9CVkwseWjZ1xoui-hQKSaLORo2BOKrFQ-sY-Sm8dQLuZWXE1fRonuaVyAikEMkaufuIgD0I~CaIXiqRatCK67Vu8t6vw06kxK2wIeUTKyBj-gJKiY6yZlMfrBjx1IRvLekddRC9rlkgejhAaD6FPWkYN6y4K75hruBGCTsj13DVw~orbFOA0LHJxZBgi6y86b1hz-kYA5ihxaDX9xr9Fc-mEsCMVwNABTv71PUXUoJekSi4YkbbhCFWlSKmActg__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/6e4d/a4aa/684f85ad3b4d28ccf28088950926ba03?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pmn1p2YqXXSZSU2Oy-gXYWuOuGlzTea~j07QfaO92aD95LkTTK0CSM3Woe3bOkNsriNlMrzrKw8FmqQtfkZCaYVjpE-JMSahC76SC2utBY~EGRJI0OtkizLwsxkcmNTk1~XavWWAL0C34Ia9i~IxQo6-2x4YrRB83ub7Jfgb7Nf0KhaBMm4hyZzPchSNPtJmWoSe695EnG6GCTtlr6YwX9Fd2pRYv-tV0hbEWhKcw~utJEyrqbIjaRAbYZyRZUx~mlydYxaH3t5IbN82~lgubZybG1Rze5qUuBDGWsVvO4kX9wLrUFuXFa-aqLYkGCM3OVQcs6YUdPzSAnGN8Z8bRw__" alt="" /></li>
            </ul>
            <p className='font-Barlow text-2xl font-medium text-[#FFFFFF]'>Instagram</p>
        </div>
        <div className='HotMenu flex flex-col-reverse gap-4'>
            <ul className='flex flex-col gap-2'>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>Terminal Pizza</p>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>5 Kişilik Hackathlon Pizza</p>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>useEffect Tavuklu Pizza</p>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>Beyaz Console Frosty</p>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>Testler Geçti Mutlu Burger</p>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>Position Absolute Acı Burger</p>
            </ul>
            <p className='font-Barlow text-2xl font-medium text-[#FFFFFF]'>Hot Menu</p>
            
        </div>
        <div className='FooterLocation flex flex-col gap-12'>
            <ul> <p className='text-5xl font-normal text-[#FFFFFF] font-Londrina w-[251px]'>Teknolojik Yemekler</p></ul>
            <ul className='flex flex-col gap-12'>
                <li className='flex flex-row-reverse justify-end'>
                    <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>+90 216 123 45 67</p>
                    <img src="https://s3-alpha-sig.figma.com/img/5bcf/42e8/cf44624c37cb7290e61fd24e95f5f71c?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=p-foHALiHzswMo3IBSv69~q1Unj6g2JmKuxaSr-o2eQX0Rjj5V~mQbX4u-QOtCV-htBOZ2J8BrsgWMQSizkcjf8TxEAdHJa3zetfRJf7nwwExF4-3spv7dAXWPaVqY8NkSEIGHJpyQX2h0yNeRWOwzH4qI3g565jl3MC5xPiWb28hgfbla9IPO6F~lRzPtNzZ10tT5T5EPYfYKGAMVyid7Oi4sFbHA-R-MaUc1TkDUJGs0F964euoFJXZeXDZAkFDQK0kJMM0CHJFZ2aHIV8c7rECCpYc1wzzVOkayff4p4sRKrAXNe8NC-MmFd8Mn9sA0tRk0tiI~kko0PSlW3asg__" alt="" />
                </li>
                <li className='flex flex-row-reverse justify-end'>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>aciktim@teknolojikyemekler.com</p>
                    <img src="https://s3-alpha-sig.figma.com/img/9fff/c412/dba32836ccb7135781a5ffed3a177067?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EiZT8y6RccmhLfCuzS~a3bZanzmsWFoPt7YcqNpSDuEdjuEAJRXUlN34G6YblpmEOl3RoZ39AaHZzhRbPJBTQDzuBB47OlEOeh5ybbW3Onoe-E-IRASXs0zfbwitGxHuOxXzvXsTmdwofztxsLxR9f0ecTQ3~ayZFvBeSws3LLieppkBX~K7UUP7vKSqZlNbFnvHTruz8i0z6k5-f6-nVVDwpu5iL5U0HT9RobdbPSTSdIRsYuCduLH4ByDP6WHkiRppuRf8MzJ6eHAThSpAdeEseyeFDrxMOzHJ3drZISRZyjHAl~8wJZtseuyU1DpWxFQC5tm-t55YJ10KnUolRA__" alt="" />
                </li>
                <li className='flex flex-row-reverse justify-end'>
                <p className='font-Barlow text-lg font-normal text-[#FFFFFF]'>341 Londonderry Road, Istanbul Türkiye</p>
                    <img src="https://s3-alpha-sig.figma.com/img/0908/44d1/bf8ba15bccac8d589cd96d428c644077?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=daRgn5~XSexubbv9eFY5-05lPDQeWmNwA-WVW2D7nKbYenjbs7fgdwqgIUFCCbmrXiRgRr7l7ve~HV2auUCvqFd2m4vDoSAUscrW-yZkS3XWrUMrzt01W7C6oQJF9jtMcSBgH5xkiUBa3n0wcg59kb-t3fdxrYeFdY8Re-zznUAueuqtl42cakQgK~OEPpsZ1AXT15yi3i9LOFLbA3R7inWhVp~rEcnQmn5zTcJLKXGR1JmdR8LoATPgIy0TUeRO6CP3klIfCeSwlJSEkG8X2-vTdugiqMS~lCHj2xj1Qob90saVNzNgfAEH1fAub-tr~E206C-dTKsSFERFUKm6ig__" alt="" />
                </li>
            </ul>
           
        </div>
    </div>
    </div>
    </>
  )
}