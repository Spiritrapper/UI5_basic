```javascript
<mvc:View
   controllerName="ui5.walkthrough.controller.InvoiceList"  <!-- 이 뷰와 연결된 컨트롤러의 이름을 지정 -->
   xmlns="sap.m"  <!-- SAPUI5 모바일 라이브러리의 XML 네임스페이스 선언 -->
   xmlns:mvc="sap.ui.core.mvc">  <!-- MVC 패턴의 XML 네임스페이스 선언 -->

   <List
      id="invoiceList"  <!-- 리스트 컨트롤의 ID를 "invoiceList"로 설정 -->
      headerText="{i18n>invoiceListTitle}"  <!-- i18n 모델의 "invoiceListTitle" 키를 사용하여 헤더 텍스트를 설정 -->
      class="sapUiResponsiveMargin"  <!-- CSS 클래스 "sapUiResponsiveMargin"을 적용하여 반응형 마진을 설정 -->
      width="auto"  <!-- 리스트의 너비를 자동으로 설정 -->
      items="{  <!-- 리스트의 항목들을 바인딩할 경로와 정렬기를 설정 -->
         path : 'invoice>/Invoices',  <!-- "invoice" 모델의 "Invoices" 경로를 바인딩 경로로 설정 -->
         sorter : {  <!-- 리스트 항목을 정렬하는 정렬기 설정 -->
            path : 'ShipperName',  <!-- "ShipperName" 필드를 기준으로 정렬 -->
            group : true  <!-- 이 정렬기를 사용하여 항목을 그룹화함 -->
         }
         }" >
      
      <headerToolbar>  <!-- 리스트의 헤더 툴바를 정의 -->
         <Toolbar>  <!-- 헤더 툴바 생성 -->
            <Title text="{i18n>invoiceListTitle}"/>  <!-- 툴바 내에 타이틀을 설정, i18n 모델의 "invoiceListTitle" 키 사용 -->
            <ToolbarSpacer/>  <!-- 툴바 내의 타이틀과 검색 필드 사이에 빈 공간을 추가 -->
            <SearchField 
               width="50%"  <!-- 검색 필드의 너비를 50%로 설정 -->
               search=".onFilterInvoices"  <!-- 검색 이벤트가 발생할 때 호출될 메서드 지정 (컨트롤러의 onFilterInvoices 메서드) -->
            />
         </Toolbar>
      </headerToolbar>
      
      <items>  <!-- 리스트의 각 항목들을 정의 -->
         <ObjectListItem
            title="{invoice>Quantity} x {invoice>ProductName}"  <!-- 리스트 항목의 제목을 설정, "Quantity"와 "ProductName"을 사용 -->
            number="{ 
                parts: [  <!-- "ExtendedPrice"와 "currency"를 조합하여 금액을 표시 -->
                    'invoice>ExtendedPrice',
                    'view>/currency'
                ],
                type: 'sap.ui.model.type.Currency',  <!-- 통화 타입으로 형식화 -->
                formatOptions: {
                    showMeasure: false  <!-- 통화 단위를 표시하지 않도록 설정 -->
                }
             }"
             numberUnit="{view>/currency}"  <!-- 통화 단위를 설정, "currency" 데이터 경로에서 가져옴 -->
             numberState="{= ${invoice>ExtendedPrice} > 50 ? 'Error' : 'Success' }"  <!-- "ExtendedPrice"가 50보다 크면 'Error', 아니면 'Success'로 표시 -->
             type="Navigation"  <!-- 항목의 유형을 "Navigation"으로 설정하여 탐색 가능하게 설정 -->
             press=".onPress"  <!-- 리스트 항목을 클릭할 때 호출될 메서드 지정 (컨트롤러의 onPress 메서드) -->
             >
             
             <firstStatus>  <!-- 리스트 항목의 첫 번째 상태를 설정 -->
                <ObjectStatus
                    text="{ 
                        path: 'invoice>Status',  <!-- "Status" 필드를 바인딩 -->
                        formatter: '.formatter.statusText'  <!-- 컨트롤러의 "formatter.statusText" 메서드를 사용하여 상태 텍스트 형식화 -->
                     }"
                />
             </firstStatus>
            </ObjectListItem>
      </items>
   </List>
</mvc:View>
```