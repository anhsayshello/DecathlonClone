export default interface ChatbotResponse {
  candidates: {
    content: {
      parts: {
        text: string
      }[]
      role: string
    }
    finishReason: string
    avgLogprobs: number
  }[]
  usageMetadata: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
    promptTokensDetails: {
      modality: string
      tokenCount: number
    }[]
    candidatesTokensDetails: {
      modality: string
      tokenCount: number
    }[]
  }
  modelVersion: string
}
