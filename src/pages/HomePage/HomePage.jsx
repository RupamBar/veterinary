import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import "./HomePage.css"

function HomePage() {
  return (
    <div>
      <Header />

      {/* carousel */}
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://www.petsy.online/cdn/shop/collections/Pedigree-C_T-collection-page-banner_1373x382.png?v=1698045373" class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src="https://www.petsy.online/cdn/shop/files/Diwali-Banner-All-Produts-2_1900x528.jpg?v=1699256299" class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src="https://www.petsy.online/cdn/shop/collections/Truelove-collection-page-banner_1373x382.png?v=1698045418" class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      {/* Trending offer */}
      <h1 className='offerContainerHeading'>-----Trending Offer-----</h1>
      <div className='offerContainer'>
        <div className='offerCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Featured_Brands_RC_e0e78f97-2979-454d-8bce-b266e70201ee_243x278.jpg?v=1674538088" alt="" className='offerWidth'/>
          <div className='petFeatureText'>Royal Chin</div>
        </div>
        <div className='offerCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Featured_Brands_Whiskas_0371b57f-8e6f-4062-b96a-8af6d0b0e687_243x278.jpg?v=1674538088" alt="" className='offerWidth'/>
          <div className='petFeatureText'>Whiskas</div>
        </div>
        <div className='offerCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Featured_Brands_Pedigree_9dcb0209-8ea5-484e-b081-7a28c3d580e4_243x278.jpg?v=1674538088" alt="" className='offerWidth'/>
          <div className='petFeatureText'>Pedigree</div>
        </div>
        <div className='offerCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Featured_Brands_Farmina_243x278.jpg?v=1672148192" alt="" className='offerWidth'/>
          <div className='petFeatureText'>Farmina</div>
        </div>
        <div className='offerCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Featured_Brands_Drools_19e99a79-9a04-4da6-b357-f6497f3f21f6_243x278.jpg?v=1674538088" alt="" className='offerWidth'/>
          <div className='petFeatureText'>Drools</div>
        </div>
      </div>

      {/* shop by pets */}
      <h1 className='petFeatureContainer_Heading'>-----Shop By Pets-----</h1>
      <div className='petFeatureContainer'>
        <div className='petFeatureCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Dog_4c76c619-d647-4286-b2bf-b002fa636931_329x329.png?v=1683200428" alt="" className='imageWidth'/>
          <div className='petFeatureText'>Dogs</div>
        </div>
        <div className='petFeatureCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Cat_bcc29749-ff7b-4844-a60e-8549a3d1869d_329x329.png?v=1683200428" alt="" className='imageWidth'/>
          <div className='petFeatureText'>Cats</div>
        </div>
        <div className='petFeatureCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Small-Animals_5d6801ad-ba44-452e-910c-a27ecd0af843_329x329.png?v=1683200428" alt="" className='imageWidth'/>
          <div className='petFeatureText'>Small Animals</div>
        </div>
        <div className='petFeatureCards'>
          <img src="https://www.petsy.online/cdn/shop/files/Birds_d6fe0dd1-1c21-45ac-adf9-a742e6e1470a_329x329.png?v=1683200428" alt="" className='imageWidth'/>
          <div className='petFeatureText'>Birds</div>
        </div>
      </div>

      {/* Brand Feature */}
      <h1 className='brandFeatureHeading'>-----Featured Brands-----</h1>
      <div className='brandParentContainer'>
        <div className='brandFeatureContainer'>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/BWE-Featured-Brands_200x200.png?v=1686127781" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/Pedigree-new_144x144.png?v=1675942894" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/Untitled_design_-_2022-02-04T123803.685_144x144_1d0637fd-a52a-4aa8-94e3-91d30634f76a_144x144.png?v=1644491226" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/2_144x144_0b0189a3-1110-41cb-aea8-619d098decad_144x144.png?v=1644491180" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/Drools_200x200.png?v=1665053381" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/M-pets_200x200.png?v=1665060323" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/2_439d8bc4-00b0-41b9-acca-b58883f2b3f8_200x200.png?v=1646297589" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/6_144x144_17a1598c-6027-4338-a2c1-175c0580d213_144x144.png?v=1644491218" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/Untitled_design_-_2022-02-04T123511.521_144x144_8bed7d22-f075-453d-8e65-bd6abb047454_144x144.png?v=1644491154" alt="" className='brandImages'/>
          </div>
          <div className='brandPadding'>
            <img src="https://www.petsy.online/cdn/shop/files/Untitled_design_-_2022-02-04T123358.682_144x144_2113e23a-a731-4dc3-926d-16f3fd8e688c_144x144.png?v=1644491163" alt="" className='brandImages'/>
          </div>
        </div>
      </div>

      <Footer/>

    </div>
  )
}

export default HomePage