신규 프로젝트 생성	1. ng new ProjectName
	2. cd ProjectName
라이브러리 생성	3. ng generate library LibraryName --prefix=enl
라이브러리 빌드	4. ng build --prod LibraryName
	여기 까지 마쳤으면 신규프로젝트에서 Library를 import 하여 테스트할 수 있다.

내부 실서버 테스트용	5.1. cd dist/LibraryName
	5.2. npm pack
	5.3.. 생성된 .tgz 파일을 작업중인 실 프로젝트 에서 npm i path to tgz 하여 처리하면된다.
npm publish	"6.1. npm init
6.2. cd dist/LibraryName
6.3. npm publish"			
