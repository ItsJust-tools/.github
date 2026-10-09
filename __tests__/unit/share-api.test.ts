import { shareFile, shareFileWithErrorHandling, ShareOptions } from '../../src/shared/share-api';

// Create a mock File object for the share API
const mockFile = {
  name: 'test.txt',
  size: 0,
  type: 'text/plain',
};

// Mock navigator.share globally
const mockShare = jest.fn();

beforeAll(() => {
  Object.defineProperty(global.navigator, 'share', {
    value: mockShare,
    writable: true,
    configurable: true,
  });
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('Web Share API', () => {
  describe('shareFile', () => {
    it('should handle successful share', async () => {
      // Arrange
      mockShare.mockResolvedValue('file_id');

      // Act
      const result = await shareFile(mockFile as unknown as File, {});

      // Assert
      expect(result).toBe('file_shared');
      expect(mockShare).toHaveBeenCalledWith({ files: [mockFile] });
    });

    it('should suppress AbortError (user cancelled share)', async () => {
      // Arrange
      mockShare.mockRejectedValue({ name: 'AbortError', message: 'User cancelled share' });

      // Act
      const result = await shareFile(mockFile as unknown as File, { shouldSuppressAbort: true });

      // Assert
      expect(result).toBe('canceled');
      expect(mockShare).toHaveBeenCalledWith({ files: [mockFile] });
    });

    it('should propagate other sharing errors', async () => {
      // Arrange
      mockShare.mockRejectedValue(new Error('Network error'));

      // Act & Assert
      await expect(shareFile(mockFile as unknown as File, {}))
        .rejects
        .toThrow('Network error');
    });
  });

  describe('shareFileWithErrorHandling', () => {
    it('should suppress AbortError when shouldSuppressAbort is true', async () => {
      mockShare.mockRejectedValue({ name: 'AbortError', message: 'User cancelled share' });

      const result = await shareFileWithErrorHandling(mockFile as unknown as File, { shouldSuppressAbort: true });
      expect(result).toBe('canceled');
    });

    it('should propagate other errors', async () => {
      mockShare.mockRejectedValue(new Error('Network error'));

      await expect(shareFileWithErrorHandling(mockFile as unknown as File, {}))
        .rejects
        .toThrow('Share failed: Network error');
    });
  });
});