import { shareFile, shareFileWithErrorHandling, ShareOptions } from '../src/shared/share-api';

// Mock navigator.share for testing
const mockNavigatorShare = {
  share: jest.fn()
};

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Web Share API', () => {
  describe('shareFile', () => {
    it('should handle successful share', async () => {
      // Arrange
      mockNavigatorShare.share.mockResolvedValue('file_id');

      // Act
      const result = await shareFile('test.txt', {});

      // Assert
      expect(result).toBe('file_shared');
      expect(mockNavigatorShare.share).toHaveBeenCalledWith({ file: 'test.txt' });
    });

    it('should suppress AbortError (user cancelled share)', async () => {
      // Arrange
      mockNavigatorShare.share.mockRejectedWith({ name: 'AbortError', message: 'User cancelled share' });

      // Act
      const result = await shareFile('test.txt', { shouldSuppressAbort: true });

      // Assert
      expect(result).toBe('canceled');
      expect(mockNavigatorShare.share).toHaveBeenCalledWith({ file: 'test.txt' });
    });

    it('should propagate other sharing errors', async () => {
      // Arrange
      mockNavigatorShare.share.mockRejectedWith(new Error('Network error'));

      // Act & Assert
      await expect(shareFile('test.txt', {}))
        .rejects
        .toThrow('Network error');
    });
  });

  describe('shareFileWithErrorHandling', () => {
    it('should suppress AbortError when shouldSuppressAbort is true', async () => {
      mockNavigatorShare.share.mockRejectedWith({ name: 'AbortError', message: 'User cancelled share' });

      const result = await shareFileWithErrorHandling('test.txt', { shouldSuppressAbort: true });
      expect(result).toBe('canceled');
    });

    it('should propagate other errors', async () => {
      mockNavigatorShare.share.mockRejectedWith(new Error('Network error'));

      await expect(shareFileWithErrorHandling('test.txt', {}))
        .rejects
        .toThrow('Share failed: Network error');
    });
  });
});