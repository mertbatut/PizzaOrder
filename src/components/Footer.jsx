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
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/6e4d/a4aa/684f85ad3b4d28ccf28088950926ba03?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VXelxY~8Kc60A-ot8hDxjPB~ODneDWbPxy1LGg9bBsK9bKpzgK1RzkVfHhP6TTDbO8ybf5jS7uKeMu24TbQjCK56phU9YMBMOQRfOrn1bONQlGZXTmTSy6uBboU6mMds1mhk0TJKk2caPb7GK0TdLuJ7SeBV2FQTl7D1Xy0RlwZeYY-USy3KW185L9HdJEJ5MA~5sHF7HOIxQHVNQ4aqezJ7YKNBG-hFTf4zt-ttpDYF2YhFKlCdpROAjoIGJPLjqvt2DyUFTkkVTkt5rcTCN5BQRTSVdKda8Du3rBb8F7-eLw4gdZtHep90A1pbnJ6Eu5VJG~bou0XcfMpWT3pqIg__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/758e/c71c/3340af96d90783c9a2fc83d7eba5e435?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=datlJzPo~~ztF2fJSarukHbaTyf1p8sCgWWy9GPoQxBqXYjDXOW7o9oXc3Wck6Q-QpRMDGQ4S1x9upIICQ2uJS2Vb9-5~hwuvPs9ZGp9dYo~nFPGBAZ55JRzRp1OercwmNbG3IPNWUEK-xRj2~x42VP3pmSXLncrWkh-fWedbOyUhhE3pWk0No6LmQleRa3nzAjTzpbKAqirz9c5wrUicu0KVUZKz2F3pzM9vW2Q80Ce-Mio4v3fv0TOwkztHXtGoIIb-1O0kR2keKJsc5ZjYPeXxfAubGZTNzuRYlAhT1OQ571297SIPc4IEweOZN02eGO1prJC6fyveHi14juL4w__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/fac5/a071/ac57e061246eb6dc85915d553dd69139?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HkoVCmMa7Njk3nVPwA1RUF-5v0miXHeMdig26IV9yQnjhcC3FsoYMMMRP1TAC8aYhpT9f1EWeh2aOH~D7hykRoB1wUsd1mL1SpI395GFEXDKkEhNRrSugDgvRTgo8u1vJ4G5rtVtgX8sYI1CMtvLQ6xfbbWAWxLAo~kND8bUw5PcL3Cuwm5MOadjI-aHG~FQrZFoFkZqvYM4wrYKTc3MgzGA37r22ScBcKO-Rohk8BymzfvZbwMc~kDOgFJi~pVMR4~~SMm~R2Km5l12Vbr7StLeg7BAJLnfLGXnBtc5r~3g9aG~o7qpaDBquj8YchurjCFwGhOl1e37kO2xRupmRQ__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/ab8f/b0dd/d3d48d4bfbb94368f413eea6e51a731e?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BTZc-KNKOQVd2Mhs1B7EoYzKs9E3tss4FjC3P5vI6IF~GTUtGkdwoRy261ZJgDgrJ90-rjY2EwvVbFbavej2shNthgyEWtrlPJsGlRnixzTBoCnGcGEjDaTt03RsMQqG23md-vl5tumIBn1ns~zK8GYvDmvB7fU9YIiUdvSMtBa7Ywgdo9UYDWMBFjQVC7YFYB0qCmU8Pd594vJqI8LUvmXeo-g0iEoUttPtv8A6yJtZjRGsF7HLHtT872jlfHQo3y0oMSyO5YkdZRZ4KPGyYZjeBxZPpmKRPLxKSlzvPZvnF~T~gN3SAkxV~TqKDpYRqDKxD0htT5z8yaluF6UVYA__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/cff3/c2ac/3faa7e879f7e8774c45ed7c70887e593?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pA0zPDP5rAJNdx1TWw-OdbT4ff~Yufuc3fA0fJRD2u~yzG0vVbcZSmfTCGaMWnAUMaWVeVvncR5gPf~x57lcLhC7~Plmlksd3yizPYAWdYUXGEPtUN-poTs0BGmI-KKR1lZ7Rfx8hS3Z7DyJS5F6-6FS12s1d2VknG03nC8MmZOp0aIzy8JGpCca4gsSjFz5E4Ix2zGbIwB0hJD7k4DElsWgQ4XNLkg1yF3-68Rs~L-rVVwgtY6~97jz7VxDLoVWaJUZTz8uXf9HFGbpFKCI3KaKPVyw~P7cCY5~vQ-17w5Xx9NBGNQ~3PAMxdhguPtpg8S4B7p3Qv9t4CpWpDe-MQ__" alt="" /></li>
                <li><img className='rounded-md' src="https://s3-alpha-sig.figma.com/img/6604/67f8/a72f04200cdc712df4da9dbe5d2cc740?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BTPOiwYdklhxlalZv-~T-TxAp~4Z53zgsjZ0adGlp-uj4vqyWcqhWhyo3dF0bc5dA4XMG22s4kG4FU0q4VQm5LXuUoYld~93hqcNyCuFKSmKxeYZEAOSPbVi0pT82U9C-UFZg5R-36tP9jx8SV6kcmFzrApxORdyB76xV8erHoIRKTtsd~SMLWZPkvnpdV-adlFQ4YzVs3glxaNNogGdYx5F4ca587QsToZFlYw1-c9vzpu6k~sk2igUgVCx9kkQ9MP88ANa4H9~CSdSDyBgxhUiiTetQFhhYmSRXTXMoiXvn9y9hxisHqAlldTHFiI01uXxWoWhee-epq7l6-g~DQ__" alt="" /></li>
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