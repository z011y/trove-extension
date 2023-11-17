import { View } from 'react-native';
import Modal from 'react-native-modal';

export default function SwipeableModal({
  children,
  isVisible,
  onSwipeComplete,
  onBackdropPress,
  swipeDirection = 'down',
}) {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onSwipeComplete}
      onBackdropPress={onBackdropPress}
      swipeDirection={swipeDirection}
      backdropOpacity={0.25}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      style={{ margin: 0, display: 'flex', justifyContent: 'flex-end' }}
    >
      <View
        style={{
          height: height / 2,
          width: width,
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          gap: 16,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 4,
            left: width / 2 - 32,
            width: 64,
            height: 4,
            borderRadius: 4,
            backgroundColor: '#F3F3F3',
          }}
        />
        {children}
      </View>
    </Modal>
  );
}
