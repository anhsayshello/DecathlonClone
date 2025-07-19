import useViewport from 'src/hooks/useViewport'

import CollapsibleFooter from './components/CollapsibleFooter'

export default function Footer() {
  const viewport = useViewport()
  return (
    <footer>
      {!viewport.desktop && (
        <div id='mobileFooter'>
          <div className='flex flex-col bg-[#f5f4f5] pb-5'>
            <div>
              <CollapsibleFooter
                first={true}
                title='Hỗ trợ khách hàng'
                links={['Decathlon là ai?', 'Phát triển bền vững', 'tuyển dụng', 'blog thể thao']}
                svg={
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path
                      d='M11.6 14.7C11.6 14.2 11.7 13.7 12.1 13.3C12.6 12.7 13.3 12.5 13.8 12C14.3 11.5 14.6 10.8 14.6 10.2C14.6 8.79999 13.4 7.59999 12 7.59999C10.6 7.59999 9.50005 8.69999 9.40005 9.99999C9.40005 10.1 9.40005 10.4 9.40005 10.4M21.2001 12C21.2001 17.081 17.0811 21.2 12 21.2C6.91903 21.2 2.80005 17.081 2.80005 12C2.80005 6.91897 6.91903 2.79999 12 2.79999C17.0811 2.79999 21.2001 6.91897 21.2001 12Z'
                      stroke='currentColor'
                    ></path>
                    <path
                      d='M11.6001 17.5C12.0971 17.5 12.5001 17.0971 12.5001 16.6C12.5001 16.103 12.0971 15.7 11.6001 15.7C11.103 15.7 10.7001 16.103 10.7001 16.6C10.7001 17.0971 11.103 17.5 11.6001 17.5Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                }
              />
              <CollapsibleFooter
                title='Về Decathlon'
                links={['Decathlon là ai?', 'Phát triển bền vững', 'tuyển dụng', 'blog thể thao']}
                svg={
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path
                      d='M12 17V9.99999M21.2001 12C21.2001 17.081 17.0811 21.2 12 21.2C6.91903 21.2 2.80005 17.081 2.80005 12C2.80005 6.91897 6.91903 2.79999 12 2.79999C17.0811 2.79999 21.2001 6.91897 21.2001 12Z'
                      stroke='currentColor'
                    ></path>
                    <path
                      d='M12.0001 8.69999C12.4972 8.69999 12.9001 8.29705 12.9001 7.79999C12.9001 7.30294 12.4972 6.89999 12.0001 6.89999C11.503 6.89999 11.1001 7.30294 11.1001 7.79999C11.1001 8.29705 11.503 8.69999 12.0001 8.69999Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                }
              />
              <CollapsibleFooter
                title='mua sắm tại Decathlon'
                links={['Decathlon là ai?', 'Phát triển bền vững', 'tuyển dụng', 'blog thể thao']}
                svg={
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path
                      d='M5 22C5 16.1 8.1 12.3 12 12.2C15.9 12.1 19 16 19 21.9M12 2.79999C10.1 2.79999 8.5 4.39999 8.5 6.29999C8.5 8.19999 10.1 9.79999 12 9.79999C13.9 9.79999 15.5 8.19999 15.5 6.29999C15.5 4.39999 13.9 2.79999 12 2.79999Z'
                      stroke='currentColor'
                    ></path>
                  </svg>
                }
              />
              <CollapsibleFooter
                title='ưu đãi khách hàng'
                links={['Decathlon là ai?', 'Phát triển bền vững', 'tuyển dụng', 'blog thể thao']}
                svg={
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path d='M20 12H4' stroke='currentColor'></path>
                  </svg>
                }
              />
              <CollapsibleFooter
                title='pháp lý'
                links={['Decathlon là ai?', 'Phát triển bền vững', 'tuyển dụng', 'blog thể thao']}
                svg={
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path
                      d='M12 17V9.99999M21.2001 12C21.2001 17.081 17.0811 21.2 12 21.2C6.91903 21.2 2.80005 17.081 2.80005 12C2.80005 6.91897 6.91903 2.79999 12 2.79999C17.0811 2.79999 21.2001 6.91897 21.2001 12Z'
                      stroke='currentColor'
                    ></path>
                    <path
                      d='M12.0001 8.69999C12.4972 8.69999 12.9001 8.29705 12.9001 7.79999C12.9001 7.30294 12.4972 6.89999 12.0001 6.89999C11.503 6.89999 11.1001 7.30294 11.1001 7.79999C11.1001 8.29705 11.503 8.69999 12.0001 8.69999Z'
                      fill='currentColor'
                    ></path>
                  </svg>
                }
              />
            </div>
            <div className='flex flex-wrap m-6 gap-5 justify-center md:justify-evenly'>
              <div className='flex flex-1 flex-col grow shrink-0 max-w-[200px]'>
                <div className='text-[13px] md:text-[15px] font-bold mb-4 '>Theo dõi chúng tôi</div>
                <div className='flex items-center gap-[10px]'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      d='M22 12.0607C22 6.504 17.5233 2 12 2C6.47667 2 2 6.504 2 12.0607C2 17.0833 5.656 21.2453 10.4373 22V14.9693H7.89867V12.06H10.4373V9.844C10.4373 7.32267 11.93 5.92933 14.2147 5.92933C15.308 5.92933 16.4533 6.126 16.4533 6.126V8.602H15.1913C13.9493 8.602 13.5627 9.378 13.5627 10.174V12.0607H16.336L15.8927 14.9687H13.5627V22C18.344 21.2453 22 17.0833 22 12.0607Z'
                      fill='#101010'
                    ></path>
                  </svg>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 3C9.5556 3 9.2496 3.0102 8.2896 3.054C7.3314 3.0978 6.6768 3.2502 6.1044 3.4728C5.5044 3.6984 4.9602 4.0524 4.5102 4.5108C4.05253 4.96028 3.69831 5.5041 3.4722 6.1044C3.2508 6.6768 3.0978 7.332 3.054 8.2902C3.0108 9.2496 3 9.555 3 12C3 14.445 3.0102 14.7504 3.054 15.7104C3.0978 16.6686 3.2502 17.3232 3.4728 17.8956C3.6984 18.4956 4.0524 19.0398 4.5108 19.4898C4.96029 19.9475 5.50411 20.3017 6.1044 20.5278C6.6768 20.7498 7.3314 20.9022 8.2896 20.946C9.2496 20.9898 9.5556 21 12 21C14.4444 21 14.7504 20.9898 15.7104 20.946C16.6686 20.9022 17.3232 20.7498 17.8956 20.5272C18.4956 20.3016 19.0398 19.9476 19.4898 19.4892C19.9475 19.0397 20.3017 18.4959 20.5278 17.8956C20.7498 17.3232 20.9022 16.6686 20.946 15.7104C20.9898 14.7504 21 14.4444 21 12C21 9.5556 20.9898 9.2496 20.946 8.2896C20.9022 7.3314 20.7498 6.6768 20.5272 6.1044C20.3012 5.50384 19.947 4.95979 19.4892 4.5102C19.0397 4.05253 18.4959 3.69831 17.8956 3.4722C17.3232 3.2508 16.668 3.0978 15.7098 3.054C14.7504 3.0108 14.445 3 12 3ZM12 4.6218C14.403 4.6218 14.688 4.6308 15.6372 4.674C16.5144 4.7142 16.9908 4.86 17.3082 4.9842C17.7282 5.1468 18.0282 5.3424 18.3432 5.6568C18.6582 5.9718 18.8532 6.2718 19.0158 6.6918C19.1394 7.0092 19.2858 7.4856 19.326 8.3628C19.3692 9.312 19.3782 9.597 19.3782 12C19.3782 14.403 19.3692 14.688 19.326 15.6372C19.2858 16.5144 19.14 16.9908 19.0158 17.3082C18.8718 17.6991 18.6419 18.0528 18.3432 18.3432C18.0528 18.642 17.6992 18.8718 17.3082 19.0158C16.9908 19.1394 16.5144 19.2858 15.6372 19.326C14.688 19.3692 14.4036 19.3782 12 19.3782C9.5964 19.3782 9.312 19.3692 8.3628 19.326C7.4856 19.2858 7.0092 19.14 6.6918 19.0158C6.30087 18.8718 5.9472 18.6419 5.6568 18.3432C5.35811 18.0528 5.12828 17.6991 4.9842 17.3082C4.8606 16.9908 4.7142 16.5144 4.674 15.6372C4.6308 14.688 4.6218 14.403 4.6218 12C4.6218 9.597 4.6308 9.312 4.674 8.3628C4.7142 7.4856 4.86 7.0092 4.9842 6.6918C5.1468 6.2718 5.3424 5.9718 5.6568 5.6568C5.94716 5.35803 6.30085 5.12819 6.6918 4.9842C7.0092 4.8606 7.4856 4.7142 8.3628 4.674C9.312 4.6308 9.597 4.6218 12 4.6218Z'
                      fill='#101010'
                    ></path>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 15.003C11.6056 15.003 11.2151 14.9254 10.8508 14.7744C10.4865 14.6235 10.1554 14.4023 9.87655 14.1235C9.5977 13.8446 9.3765 13.5136 9.22558 13.1492C9.07467 12.7849 8.99699 12.3944 8.99699 12C8.99699 11.6057 9.07467 11.2152 9.22558 10.8508C9.3765 10.4865 9.5977 10.1554 9.87655 9.87659C10.1554 9.59774 10.4865 9.37654 10.8508 9.22562C11.2151 9.07471 11.6056 8.99703 12 8.99703C12.7964 8.99703 13.5603 9.31342 14.1234 9.87659C14.6866 10.4398 15.003 11.2036 15.003 12C15.003 12.7965 14.6866 13.5603 14.1234 14.1235C13.5603 14.6866 12.7964 15.003 12 15.003ZM12 7.37403C10.7731 7.37403 9.59646 7.86141 8.72892 8.72896C7.86137 9.5965 7.37399 10.7731 7.37399 12C7.37399 13.2269 7.86137 14.4036 8.72892 15.2711C9.59646 16.1387 10.7731 16.626 12 16.626C13.2269 16.626 14.4035 16.1387 15.2711 15.2711C16.1386 14.4036 16.626 13.2269 16.626 12C16.626 10.7731 16.1386 9.5965 15.2711 8.72896C14.4035 7.86141 13.2269 7.37403 12 7.37403ZM17.9718 7.29003C17.9718 7.58005 17.8566 7.85818 17.6515 8.06325C17.4464 8.26833 17.1683 8.38353 16.8783 8.38353C16.5883 8.38353 16.3101 8.26833 16.1051 8.06325C15.9 7.85818 15.7848 7.58005 15.7848 7.29003C15.7848 7.00002 15.9 6.72188 16.1051 6.51681C16.3101 6.31174 16.5883 6.19653 16.8783 6.19653C17.1683 6.19653 17.4464 6.31174 17.6515 6.51681C17.8566 6.72188 17.9718 7.00002 17.9718 7.29003Z'
                      fill='#101010'
                    ></path>
                  </svg>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M19.792 5.41471C20.6521 5.64577 21.3325 6.32614 21.5635 7.18621C21.9872 8.75232 22 12.0001 22 12.0001C22 12.0001 22 15.2607 21.5764 16.8139C21.3453 17.674 20.665 18.3544 19.8049 18.5854C18.2516 19.0091 12 19.0091 12 19.0091C12 19.0091 5.74839 19.0091 4.19512 18.5854C3.33504 18.3544 2.65469 17.674 2.42362 16.8139C2 15.2478 2 12.0001 2 12.0001C2 12.0001 2 8.75232 2.41078 7.19905C2.64185 6.33897 3.32221 5.65861 4.18229 5.42755C5.73556 5.00392 11.9872 4.99109 11.9872 4.99109C11.9872 4.99109 18.2388 4.99109 19.792 5.41471ZM15.1836 12.0001L9.99743 15.0039V8.99623L15.1836 12.0001Z'
                      fill='#101010'
                    ></path>
                  </svg>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      d='M16.4168 2H12.964V15.6232C12.964 17.2464 11.6361 18.5797 9.98344 18.5797C8.33082 18.5797 7.00283 17.2464 7.00283 15.6232C7.00283 14.029 8.30132 12.7246 9.89493 12.6667V9.24639C6.3831 9.30433 3.55005 12.1159 3.55005 15.6232C3.55005 19.1594 6.44212 22 10.013 22C13.5838 22 16.4758 19.1304 16.4758 15.6232V8.63767C17.7743 9.56522 19.3679 10.1159 21.05 10.1449V6.72464C18.4531 6.63768 16.4168 4.55072 16.4168 2Z'
                      fill='#101010'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='flex flex-1 flex-col grow shrink-0 max-w-[200px]'>
                <div className='text-[13px] md:text-[15px] font-bold mb-4 '>Tải ứng dụng Decathlon</div>
                <div className='flex gap-3'>
                  <div className='relative aspect-square w-[95px] h-[28px]'>
                    <img
                      className='absolute h-full w-full inset-0 text-transparent cursor-pointer'
                      src='https://contents.mediadecathlon.com/s1012444/k$f9cd9f79c6b583f1c842884359c0843e/app%20store%20button%20tr.svg?format=auto'
                      alt='appstore'
                    />
                  </div>
                  <div className='relative aspect-square w-[95px] h-[28px]'>
                    <img
                      className='absolute h-full w-full inset-0 text-transparent cursor-pointer'
                      src='https://contents.mediadecathlon.com/s815544/k$f30b23aeb9d31e68b3c76fa12cf5ab82/google%20play%20badge.png?format=auto'
                      alt='googleplay'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-1 max-w-[200px]'>
                <div className='relative aspect-square w-[200px] h-[76px] mt-3'>
                  <img
                    className='absolute h-full w-full inset-0 text-transparent cursor-pointer'
                    src='https://contents.mediadecathlon.com/s1061142/k$def668b51d6ea5f5f2790c4ae1faf657/notified%20web.png'
                    alt='verified'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {viewport.desktop && (
        <div id='desktopFooter'>
          <div className='flex flex-col bg-[#f5f4f5] px-10'>
            <div className='flex flex-wrap justify-evenly px-8 pt-8 pb-5 gap-7 border-b border-gray-400'>
              <div className='flex flex-1 flex-col grow shrink-0 max-w-[300px]'>
                <div className='font-bold mb-5.5'>Theo dõi chúng tôi</div>
                <div className='flex items-center gap-[10px]'>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      d='M22 12.0607C22 6.504 17.5233 2 12 2C6.47667 2 2 6.504 2 12.0607C2 17.0833 5.656 21.2453 10.4373 22V14.9693H7.89867V12.06H10.4373V9.844C10.4373 7.32267 11.93 5.92933 14.2147 5.92933C15.308 5.92933 16.4533 6.126 16.4533 6.126V8.602H15.1913C13.9493 8.602 13.5627 9.378 13.5627 10.174V12.0607H16.336L15.8927 14.9687H13.5627V22C18.344 21.2453 22 17.0833 22 12.0607Z'
                      fill='#101010'
                    ></path>
                  </svg>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 3C9.5556 3 9.2496 3.0102 8.2896 3.054C7.3314 3.0978 6.6768 3.2502 6.1044 3.4728C5.5044 3.6984 4.9602 4.0524 4.5102 4.5108C4.05253 4.96028 3.69831 5.5041 3.4722 6.1044C3.2508 6.6768 3.0978 7.332 3.054 8.2902C3.0108 9.2496 3 9.555 3 12C3 14.445 3.0102 14.7504 3.054 15.7104C3.0978 16.6686 3.2502 17.3232 3.4728 17.8956C3.6984 18.4956 4.0524 19.0398 4.5108 19.4898C4.96029 19.9475 5.50411 20.3017 6.1044 20.5278C6.6768 20.7498 7.3314 20.9022 8.2896 20.946C9.2496 20.9898 9.5556 21 12 21C14.4444 21 14.7504 20.9898 15.7104 20.946C16.6686 20.9022 17.3232 20.7498 17.8956 20.5272C18.4956 20.3016 19.0398 19.9476 19.4898 19.4892C19.9475 19.0397 20.3017 18.4959 20.5278 17.8956C20.7498 17.3232 20.9022 16.6686 20.946 15.7104C20.9898 14.7504 21 14.4444 21 12C21 9.5556 20.9898 9.2496 20.946 8.2896C20.9022 7.3314 20.7498 6.6768 20.5272 6.1044C20.3012 5.50384 19.947 4.95979 19.4892 4.5102C19.0397 4.05253 18.4959 3.69831 17.8956 3.4722C17.3232 3.2508 16.668 3.0978 15.7098 3.054C14.7504 3.0108 14.445 3 12 3ZM12 4.6218C14.403 4.6218 14.688 4.6308 15.6372 4.674C16.5144 4.7142 16.9908 4.86 17.3082 4.9842C17.7282 5.1468 18.0282 5.3424 18.3432 5.6568C18.6582 5.9718 18.8532 6.2718 19.0158 6.6918C19.1394 7.0092 19.2858 7.4856 19.326 8.3628C19.3692 9.312 19.3782 9.597 19.3782 12C19.3782 14.403 19.3692 14.688 19.326 15.6372C19.2858 16.5144 19.14 16.9908 19.0158 17.3082C18.8718 17.6991 18.6419 18.0528 18.3432 18.3432C18.0528 18.642 17.6992 18.8718 17.3082 19.0158C16.9908 19.1394 16.5144 19.2858 15.6372 19.326C14.688 19.3692 14.4036 19.3782 12 19.3782C9.5964 19.3782 9.312 19.3692 8.3628 19.326C7.4856 19.2858 7.0092 19.14 6.6918 19.0158C6.30087 18.8718 5.9472 18.6419 5.6568 18.3432C5.35811 18.0528 5.12828 17.6991 4.9842 17.3082C4.8606 16.9908 4.7142 16.5144 4.674 15.6372C4.6308 14.688 4.6218 14.403 4.6218 12C4.6218 9.597 4.6308 9.312 4.674 8.3628C4.7142 7.4856 4.86 7.0092 4.9842 6.6918C5.1468 6.2718 5.3424 5.9718 5.6568 5.6568C5.94716 5.35803 6.30085 5.12819 6.6918 4.9842C7.0092 4.8606 7.4856 4.7142 8.3628 4.674C9.312 4.6308 9.597 4.6218 12 4.6218Z'
                      fill='#101010'
                    ></path>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12 15.003C11.6056 15.003 11.2151 14.9254 10.8508 14.7744C10.4865 14.6235 10.1554 14.4023 9.87655 14.1235C9.5977 13.8446 9.3765 13.5136 9.22558 13.1492C9.07467 12.7849 8.99699 12.3944 8.99699 12C8.99699 11.6057 9.07467 11.2152 9.22558 10.8508C9.3765 10.4865 9.5977 10.1554 9.87655 9.87659C10.1554 9.59774 10.4865 9.37654 10.8508 9.22562C11.2151 9.07471 11.6056 8.99703 12 8.99703C12.7964 8.99703 13.5603 9.31342 14.1234 9.87659C14.6866 10.4398 15.003 11.2036 15.003 12C15.003 12.7965 14.6866 13.5603 14.1234 14.1235C13.5603 14.6866 12.7964 15.003 12 15.003ZM12 7.37403C10.7731 7.37403 9.59646 7.86141 8.72892 8.72896C7.86137 9.5965 7.37399 10.7731 7.37399 12C7.37399 13.2269 7.86137 14.4036 8.72892 15.2711C9.59646 16.1387 10.7731 16.626 12 16.626C13.2269 16.626 14.4035 16.1387 15.2711 15.2711C16.1386 14.4036 16.626 13.2269 16.626 12C16.626 10.7731 16.1386 9.5965 15.2711 8.72896C14.4035 7.86141 13.2269 7.37403 12 7.37403ZM17.9718 7.29003C17.9718 7.58005 17.8566 7.85818 17.6515 8.06325C17.4464 8.26833 17.1683 8.38353 16.8783 8.38353C16.5883 8.38353 16.3101 8.26833 16.1051 8.06325C15.9 7.85818 15.7848 7.58005 15.7848 7.29003C15.7848 7.00002 15.9 6.72188 16.1051 6.51681C16.3101 6.31174 16.5883 6.19653 16.8783 6.19653C17.1683 6.19653 17.4464 6.31174 17.6515 6.51681C17.8566 6.72188 17.9718 7.00002 17.9718 7.29003Z'
                      fill='#101010'
                    ></path>
                  </svg>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M19.792 5.41471C20.6521 5.64577 21.3325 6.32614 21.5635 7.18621C21.9872 8.75232 22 12.0001 22 12.0001C22 12.0001 22 15.2607 21.5764 16.8139C21.3453 17.674 20.665 18.3544 19.8049 18.5854C18.2516 19.0091 12 19.0091 12 19.0091C12 19.0091 5.74839 19.0091 4.19512 18.5854C3.33504 18.3544 2.65469 17.674 2.42362 16.8139C2 15.2478 2 12.0001 2 12.0001C2 12.0001 2 8.75232 2.41078 7.19905C2.64185 6.33897 3.32221 5.65861 4.18229 5.42755C5.73556 5.00392 11.9872 4.99109 11.9872 4.99109C11.9872 4.99109 18.2388 4.99109 19.792 5.41471ZM15.1836 12.0001L9.99743 15.0039V8.99623L15.1836 12.0001Z'
                      fill='#101010'
                    ></path>
                  </svg>
                  <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    height='32'
                    aria-hidden='true'
                  >
                    <path
                      d='M16.4168 2H12.964V15.6232C12.964 17.2464 11.6361 18.5797 9.98344 18.5797C8.33082 18.5797 7.00283 17.2464 7.00283 15.6232C7.00283 14.029 8.30132 12.7246 9.89493 12.6667V9.24639C6.3831 9.30433 3.55005 12.1159 3.55005 15.6232C3.55005 19.1594 6.44212 22 10.013 22C13.5838 22 16.4758 19.1304 16.4758 15.6232V8.63767C17.7743 9.56522 19.3679 10.1159 21.05 10.1449V6.72464C18.4531 6.63768 16.4168 4.55072 16.4168 2Z'
                      fill='#101010'
                    ></path>
                  </svg>
                </div>
              </div>
              <div className='flex flex-1 flex-col grow shrink-0 max-w-[300px]'>
                <div className='font-bold mb-5.5'>Tải ứng dụng Decathlon</div>
                <div className='flex gap-3'>
                  <div className='relative aspect-square w-[132px] h-[39px]'>
                    <img
                      className='absolute h-full w-full inset-0 text-transparent cursor-pointer'
                      src='https://contents.mediadecathlon.com/s1012444/k$f9cd9f79c6b583f1c842884359c0843e/app%20store%20button%20tr.svg?format=auto'
                      alt='appstore'
                    />
                  </div>
                  <div className='relative aspect-square w-[132px] h-[39px]'>
                    <img
                      className='absolute h-full w-full inset-0 text-transparent cursor-pointer'
                      src='https://contents.mediadecathlon.com/s815544/k$f30b23aeb9d31e68b3c76fa12cf5ab82/google%20play%20badge.png?format=auto'
                      alt='googleplay'
                    />
                  </div>
                </div>
              </div>
              <div className='flex flex-1 max-w-[300px]'>
                <div className='relative aspect-square w-[273px] h-[103px] mt-3'>
                  <img
                    className='absolute h-full w-full inset-0 text-transparent cursor-pointer'
                    src='https://contents.mediadecathlon.com/s1061142/k$def668b51d6ea5f5f2790c4ae1faf657/notified%20web.png'
                    alt='verified'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='px-8 pt-8 pb-4 bg-[#f5f4f5]'>
            <div className='flex justify-evenly'>
              <div>
                <div className='text-sm font-semibold'>Về Decathlon</div>
                <div className='h-[1px] bg-[#3643ba] w-[60px] my-2'></div>
                <div className='text-xs'>
                  <div className='pb-2 capitalize'>Decathlon là ai?</div>
                  <div className='pb-2 capitalize'>phát triển bền vững</div>
                  <div className='pb-2 capitalize'>tuyển dụng</div>
                  <div className='pb-2 capitalize'>blog thể thao</div>
                </div>
              </div>
              <div>
                <div className='text-sm font-semibold'>Về Decathlon</div>
                <div className='h-[1px] bg-[#3643ba] w-[60px] my-2'></div>
                <div className='text-xs'>
                  <div className='pb-2 capitalize'>Decathlon là ai?</div>
                  <div className='pb-2 capitalize'>phát triển bền vững</div>
                  <div className='pb-2 capitalize'>tuyển dụng</div>
                  <div className='pb-2 capitalize'>blog thể thao</div>
                </div>
              </div>
              <div>
                <div className='text-sm font-semibold'>Về Decathlon</div>
                <div className='h-[1px] bg-[#3643ba] w-[60px] my-2'></div>
                <div className='text-xs'>
                  <div className='pb-2 capitalize'>Decathlon là ai?</div>
                  <div className='pb-2 capitalize'>phát triển bền vững</div>
                  <div className='pb-2 capitalize'>tuyển dụng</div>
                  <div className='pb-2 capitalize'>blog thể thao</div>
                </div>
              </div>
              <div>
                <div className='text-sm font-semibold'>Về Decathlon</div>
                <div className='h-[1px] bg-[#3643ba] w-[60px] my-2'></div>
                <div className='text-xs'>
                  <div className='pb-2 capitalize'>Decathlon là ai?</div>
                  <div className='pb-2 capitalize'>phát triển bền vững</div>
                  <div className='pb-2 capitalize'>tuyển dụng</div>
                  <div className='pb-2 capitalize'>blog thể thao</div>
                </div>
              </div>
              <div>
                <div className='text-sm font-semibold'>Về Decathlon</div>
                <div className='h-[1px] bg-[#3643ba] w-[60px] my-2'></div>
                <div className='text-xs'>
                  <div className='pb-2 capitalize'>Decathlon là ai?</div>
                  <div className='pb-2 capitalize'>phát triển bền vững</div>
                  <div className='pb-2 capitalize'>tuyển dụng</div>
                  <div className='pb-2 capitalize'>blog thể thao</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
