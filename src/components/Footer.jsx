import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block' >
          <h4 className=''>Liên hệ với chúng tôi</h4>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='facebook-f' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='twitter' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='google' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                MTA Pet Shop
              </h6>
              <p>
                Cam kết mang đến cho khách hàng và thú cưng của bạn trải nghiệm tốt nhất.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Sản phẩm</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Đồ ăn
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Quần áo cho thú
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Giường xinh
                </a>
              </p>
            </MDBCol>


            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                236 Hoàng Quốc Việt, Cổ Nhuế 1 , Bắc Từ Liêm , Hà Nội
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3'  />
                duyfaker01@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 84 979807308
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 84 979807308
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Bản quyền thuộc về:
        <a className='text-reset fw-bold' href='https://www.facebook.com/profile.php?id=100029152816163'>
          DuyTa
        </a>
      </div>
    </MDBFooter>
  );
}