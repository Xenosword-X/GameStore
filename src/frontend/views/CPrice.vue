<template>
  <div class="container">
    <!-- 桌面版 -->
    <div class="table-responsive d-none d-md-block">
      <table
        class="table table-bordered table-striped align-middle shadow-sm rounded overflow-hidden"
      >
        <thead class="table-dark text-center">
          <tr>
            <th scope="col" style="width: 120px">項目</th>
            <th scope="col">服務內容</th>
            <th scope="col" style="width: 180px">報價</th>
            <th scope="col">備註</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" class="text-center">包膜</th>
            <td>主機或手把進行專屬設計貼膜，提升外觀個性化。</td>
            <td>主機 $1500、手把 $800</td>
            <td>須提供符合尺寸與解析度的圖樣設計。</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">烤漆</th>
            <td>提供多種顏色烤漆服務，打造獨一無二主機外觀。</td>
            <td>主機 $3000、手把 $1500</td>
            <td>實際顏色可能與參考樣式略有差異。</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">RGB燈效</th>
            <td>安裝可調式RGB燈條，提升視覺震撼感。</td>
            <td>$500 ~ $1500</td>
            <td>支援手機APP控制多種燈光模式。</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">特製風扇</th>
            <td>更換高效能風扇或加裝外部風扇，有效降低溫度。</td>
            <td>$1000 ~ $2000</td>
            <td>-</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">水冷改裝</th>
            <td>主機內部導入水冷系統，加強散熱與噪音控制。</td>
            <td>$6000 ~ $8000</td>
            <td>安裝後不可還原</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">LED 顯示</th>
            <td>主機外部安裝LED跑馬燈或小螢幕，顯示系統狀態。</td>
            <td>$1500 ~ $3000</td>
            <td>可客製顯示內容</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">金屬外殼</th>
            <td>將塑膠機殼更換為鋁合金或其他金屬材質</td>
            <td>$2000 ~ $5000</td>
            <td>提升質感與保護性</td>
          </tr>
          <tr>
            <th scope="row" class="text-center">主題風格</th>
            <td>依據熱門主題（如漫威、任天堂）進行全套改裝</td>
            <td>$5000 ~ $10000</td>
            <td>依難度與材料而異</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 手機版 -->
    <div class="d-block d-md-none">
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">包膜</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">主機或手把進行專屬設計貼膜，提升外觀個性化。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">主機 $1500、手把 $800</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">須提供符合尺寸與解析度的圖樣設計。</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">烤漆</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">提供多種顏色烤漆服務，打造獨一無二主機外觀。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">主機 $3000、手把 $1500</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">實際顏色可能與參考樣式略有差異。</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">RGB燈效</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">安裝可調式RGB燈條，提升視覺震撼感。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">$500 ~ $1500</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">支援手機APP控制多種燈光模式。</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">特製風扇</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">更換高效能風扇或加裝外部風扇，有效降低溫度。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">$1000 ~ $2000</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">-</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">水冷改裝</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">主機內部導入水冷系統，加強散熱與噪音控制。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">$6000 ~ $8000</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">安裝後不可還原</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">LED 顯示</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">主機外部安裝LED跑馬燈或小螢幕，顯示系統狀態。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">$1500 ~ $3000</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">可客製顯示內容</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">金屬外殼</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">將塑膠機殼更換為鋁合金或其他金屬材質。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">$2000 ~ $5000</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">提升質感與保護性</p>
          </div>
        </div>
      </div>
      <div class="card mb-4 shadow-sm border-0 rounded-4" style="overflow: hidden">
        <div class="card-body px-4 py-3">
          <h5 class="fw-bold text-primary border-bottom pb-2 mb-3">主題風格</h5>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">服務內容：</span>
            <p class="mb-1">依據熱門主題（如漫威、任天堂）進行全套改裝。</p>
          </div>
          <div class="mb-2">
            <span class="fw-semibold text-secondary">報價：</span>
            <p class="mb-1 text-danger fw-bold">$5000 ~ $10000</p>
          </div>
          <div>
            <span class="fw-semibold text-secondary">備註：</span>
            <p class="mb-0">依難度與材料而異</p>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-danger mt-5" role="alert">
      ⚠️ 客製化後將使原廠保固失效，請務必確認並評估後再購買。
    </div>
  </div>
</template>
