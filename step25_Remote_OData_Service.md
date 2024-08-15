### 한글 해석

### **프록시 서버 설치**

이번 단계에서는 https://services.odata.org/V2/Northwind/Northwind.svc/ 에 위치한 공개적으로 사용 가능한 Northwind OData 서비스를 사용하려고 합니다. 따라서, 우리의 URI는 공식 Northwind OData 서비스를 가리킵니다. 크로스 오리진 리소스 공유(CORS)를 방지하기 위해, UI5 툴링에서 프록시를 사용하고 앱의 데이터 소스 URI 속성에 경로만 유지하는 것이 일반적인 절차입니다.

UI5 커뮤니티에서 다양한 프록시 솔루션이 제공되고 있으며, 이는 UI5 Tooling 커스텀 미들웨어 확장으로 제공됩니다. 이 튜토리얼에서는 `ui5-middleware-simpleproxy`를 사용합니다. 새 터미널 창을 열고 앱의 루트 폴더에서 `npm i -D ui5-middleware-simpleproxy` 명령어를 실행하여 이 패키지를 개발 종속성으로 설치합니다.

#### `ui5.yaml`

```yaml
specVersion: '3.0'
metadata:
  name: ui5.walkthrough
type: application
framework:
  name: OpenUI5
  version: "1.126.0"
  libraries:
    - name: sap.m
    - name: sap.ui.core
    - name: themelib_sap_horizon
server:
  customMiddleware:
  - name: ui5-middleware-simpleproxy
    afterMiddleware: compression
    mountPath: /V2
    configuration:
      baseUri: "https://services.odata.org"
```

`ui5.yaml` 구성 파일은 이 튜토리얼의 1단계에서 `ui5 init` 명령어를 실행했을 때 앱 루트 폴더에 자동으로 생성되었습니다. 이제 `ui5.yaml` 파일에서 프록시를 구성합니다. `mountPath` 속성은 프록시에서 처리할 URL을 구성하고, `configuration/baseUri` 속성은 실제 서버 주소를 저장합니다.

#### `webapp/manifest.json`

```json
{
	...
	"sap.app": {
		...,
		"dataSources": {
			"invoiceRemote": {
				"uri": "V2/Northwind/Northwind.svc/",
				"type": "OData",
				"settings": {
					"odataVersion": "2.0"
				}
			}
		}
	},
	...
	"sap.ui5": {
		...
		"models": {
			...
			"invoice": {
				"dataSource": "invoiceRemote"
			}
		}
		...
}
```

`manifest.json` 파일의 `sap.app` 섹션에 데이터 소스 구성을 추가합니다. `invoiceRemote` 키로 구성 객체를 지정하여 자동 모델 인스턴스 생성을 허용합니다. 서비스 유형(OData)과 모델 버전(2.0)을 지정합니다.

`models` 섹션에서 `invoice` 모델의 내용을 대체합니다. 이 키는 여전히 모델 이름으로 사용되며, 컴포넌트 초기화 중에 자동으로 인스턴스화됩니다. 그러나 `dataSource` 키의 `invoiceRemote` 값은 우리가 위에서 지정한 데이터 소스 섹션을 참조합니다. 이 구성은 컴포넌트가 앱 시작 시 해당 모델에 대한 기술 정보를 가져올 수 있도록 합니다.

이제 컴포넌트는 우리가 위에서 지정한 설정에 따라 `sap.ui.model.odata.v2.ODataModel`의 인스턴스를 자동으로 생성하고, 이를 `invoice`라는 이름의 모델로 사용할 수 있게 합니다. `invoiceRemote` 데이터 소스를 사용할 때, ODataModel은 실제 Northwind OData 서비스에서 데이터를 가져옵니다. Northwind OData 서비스에서 가져온 인보이스는 이전에 사용한 JSON 데이터와 동일한 속성을 가지고 있지만, `status` 속성은 Northwind OData 서비스에서 제공되지 않습니다.

**참고사항:**
기본 모델을 컴포넌트에 추가하고 싶다면, 디스크립터 파일에서 모델의 이름을 빈 문자열로 변경할 수 있습니다. 자동으로 인스턴스화된 모델은 `this.getModel`을 호출하여 컴포넌트에서 가져올 수 있습니다. 컴포넌트 기반 앱의 컨트롤러에서는 `this.getView().getModel()`을 호출하여 자동으로 인스턴스화된 모델을 가져올 수 있습니다. 명명된 모델을 가져오려면 디스크립터 파일에 정의된 모델 이름을 `getModel`에 전달해야 하며, 컴포넌트에서는 `this.getModel("invoice")`을 호출하여 우리가 정의한 인보이스 모델을 가져올 수 있습니다.