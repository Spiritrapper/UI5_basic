sap.ui.define([
    "sap/ui/core/UIComponent", // UIComponent 클래스를 가져옵니다. 이 클래스는 SAPUI5 애플리케이션의 기본 구성 요소입니다.
    "sap/ui/model/json/JSONModel", // JSONModel 클래스를 가져옵니다. JSON 형식의 데이터 모델을 제공합니다.
    "sap/ui/Device" // Device 클래스를 가져옵니다. 장치의 특성에 관한 정보를 제공합니다.
], (UIComponent, JSONModel, Device) => { // 각 모듈을 함수의 매개변수로 받아옵니다.
    "use strict"; // 엄격 모드로 실행하여 코드의 안전성을 높입니다.

    return UIComponent.extend("ui5.walkthrough.Component", { // UIComponent를 확장하여 새로운 Component 클래스를 정의합니다.
       metadata : {
          interfaces: ["sap.ui.core.IAsyncContentCreation"], // 이 컴포넌트가 비동기 콘텐츠 생성을 지원함을 나타냅니다.
          manifest: "json" // 이 컴포넌트는 JSON 형식의 manifest 파일을 사용합니다.
       },

       init() { // 컴포넌트의 초기화 메서드입니다.
          // 부모 클래스(UIComponent)의 init 함수를 호출하여 기본 초기화 작업을 수행합니다.
          UIComponent.prototype.init.apply(this, arguments);
          
          // 데이터 모델을 설정합니다.
          const oData = { // 모델에 포함될 데이터를 정의합니다.
             recipient : {
                name : "World" // 기본 수신자 이름을 "World"로 설정합니다.
             }
          };
          const oModel = new JSONModel(oData); // JSONModel을 생성하고 데이터를 설정합니다.
          this.setModel(oModel); // 생성된 모델을 컴포넌트에 설정합니다.

          // 장치 모델 설정: 현재 장치의 특성에 대한 정보를 제공하는 모델입니다.
          const oDeviceModel = new JSONModel(Device); // Device 모듈을 사용하여 장치 정보를 담은 모델을 생성합니다.
          oDeviceModel.setDefaultBindingMode("OneWay"); // 모델의 기본 바인딩 모드를 "OneWay"로 설정합니다.
          this.setModel(oDeviceModel, "device"); // 생성된 장치 모델을 "device"라는 이름으로 컴포넌트에 설정합니다.

          // URL 또는 해시를 기반으로 뷰를 생성합니다.
          this.getRouter().initialize(); // 라우터를 초기화하여 URL에 맞는 뷰를 로드할 준비를 합니다.

          // i18n 모델 설정: 다국어 지원을 위한 리소스 번들을 설정합니다.
    //       const i18nModel = new ResourceModel({ // 주석 처리된 코드입니다.
    //          bundleName: "ui5.walkthrough.i18n.i18n" // i18n 리소스 번들의 위치를 설정합니다.
    //       });
    //       this.setModel(i18nModel, "i18n"); // 생성된 i18n 모델을 "i18n"이라는 이름으로 컴포넌트에 설정합니다.
       },

       getContentDensityClass() { // 컨텐츠 밀도(스타일 클래스)를 반환하는 메서드입니다.
         return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact"; // 장치가 터치 스크린을 지원하면 "sapUiSizeCozy", 그렇지 않으면 "sapUiSizeCompact" 클래스를 반환합니다.
       }
    });
});

// Component.js

// 역할: 애플리케이션의 중심 컴포넌트로, 모델을 초기화하고 라우팅을 설정하며, 전체 애플리케이션의 초기화를 담당합니다.
// 구성 요소:
// metadata: 애플리케이션 메타데이터를 정의하며, 여기서 애플리케이션의 라우팅, 종속성, 모델 등을 설정합니다.
// init: 애플리케이션이 시작될 때 호출되며, 모델 설정, 라우터 초기화 등이 이루어집니다.


// 주석의 의미:
// sap.ui.define([...], (UIComponent, JSONModel, Device) => { ... });: SAPUI5 모듈을 정의하고 의존성을 관리하는 방법입니다. UIComponent, JSONModel, Device 클래스를 가져와서 사용합니다.
// "use strict";: 코드 실행을 엄격 모드로 설정하여 일부 잠재적인 오류를 방지합니다.
// UIComponent.extend("ui5.walkthrough.Component", { ... });: UIComponent를 확장하여 새로운 컴포넌트를 정의합니다. 이 컴포넌트는 애플리케이션의 루트 컴포넌트로 작동합니다.
// metadata: 컴포넌트의 메타데이터를 정의합니다. interfaces와 manifest 속성을 설정하여 컴포넌트의 기능과 구성을 지정합니다.
// init(): 컴포넌트 초기화 메서드로, 기본 설정 및 모델을 구성합니다.
// setModel(): 모델을 컴포넌트에 설정하여 데이터 바인딩을 지원합니다.
// getRouter().initialize();: 애플리케이션의 라우터를 초기화하여 URL에 따라 적절한 뷰를 로드합니다.
// getContentDensityClass(): 장치의 터치 지원 여부에 따라 컨텐츠 밀도 클래스를 반환하여 UI의 크기를 조정합니다.
// 이 코드는 SAPUI5 애플리케이션의 컴포넌트를 설정하고 초기화하는 데 사용되며, 데이터 모델과 장치 정보를 관리하고 라우팅을 설정하는 작업을 포함합니다.