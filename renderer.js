// 이 파일은 웹 페이지에서 실행되고 사용자 인터페이스와 상호작용합니다
console.log("렌더러 프로세스가 로드되었습니다!");

// 페이지 로드 완료 시
document.addEventListener("DOMContentLoaded", function () {
  // 컨테이너 스타일 초기 설정
  const container =
    document.querySelector(".intro-container") ||
    document.querySelector(".cross-examination-container") ||
    document.querySelector(".free-discussion-container") ||
    document.querySelector(".conclusion-container") ||
    document.querySelector(".time-setting-container");

  if (container) {
    // 확대/축소를 위한 초기 스타일 설정
    container.style.transformOrigin = "top center";
    container.style.margin = "0 auto";

    // 스케일 함수 정의
    function scaleContent() {
      // 기본 컨테이너 크기 (설계 기준 크기)
      const baseWidth = 540; // 500px + 좌우 여백
      const baseHeight = 700; // 예상 높이 + 여백

      // 화면 크기에 맞게 스케일 계산
      const scaleWidth = window.innerWidth / baseWidth;
      const scaleHeight = window.innerHeight / baseHeight;

      // 더 작은 비율을 선택하여 화면에 맞도록 함
      const scale = Math.min(scaleWidth, scaleHeight);

      // 최소/최대 스케일 제한
      const finalScale = Math.max(0.5, Math.min(scale, 1.5));

      // 스케일 적용
      container.style.transform = `scale(${finalScale})`;

      // 높이 조정으로 중앙 정렬 유지 (특히 작은 화면에서)
      if (scale < 1) {
        container.style.marginBottom = `${(finalScale - 1) * -300}px`;
      } else {
        container.style.marginBottom = "0";
      }

      console.log(
        `Window size: ${window.innerWidth}x${window.innerHeight}, Scale: ${finalScale}`
      );
    }

    // 창 크기 변경 시 스케일 조정
    window.addEventListener("resize", scaleContent);

    // 초기 로드 시 한번 실행
    scaleContent();

    // 메인 프로세스로부터 창 크기 변경 이벤트 수신
    window.electronAPI.onResize((event, { width, height }) => {
      scaleContent();
    });
  }
});
