from langchain_community.embeddings import HuggingFaceBgeEmbeddings
import torch
from torch.nn import CosineSimilarity


def main():
    model_name = "/home/zion/llm/models/bge-large-zh-v1.5"
    model_kwargs = {'device': 'cuda'}
    # set True to compute cosine similarity
    encode_kwargs = {'normalize_embeddings': True}
    model = HuggingFaceBgeEmbeddings(
        model_name=model_name,
        model_kwargs=model_kwargs,
        encode_kwargs=encode_kwargs,
        # query_instruction="为这个句子生成表示以用于检索相关文章："
    )
    # model.query_instruction = "为这个句子生成表示以用于检索相关文章："
    print("model: ")
    print(model)
    embedding1 = model.embed_query("源图")
    print("len(embedding1):", len(embedding1))
    embedding2 = model.embed_query("源理")
    print("len(embedding2):", len(embedding2))

    cosine_similarity = CosineSimilarity(dim=0)
    similarity = cosine_similarity(torch.tensor(
        embedding1), torch.tensor(embedding2))
    print("similarity: ", similarity)


if __name__ == '__main__':
    main()
