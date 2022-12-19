import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms


class Net(nn.Module):

    def __init__(self, input_shape, vocab, activation_function='sigmoid', pooling_type='avg',):
        super().__init__()
        self.n_classes = len(vocab)
        self.conv1 = nn.Conv2d(1, 6, 5)
        self.conv1_bn = nn.BatchNorm2d(6)
        if pooling_type == 'avg':
            self.pool = nn.AvgPool2d(2, 2)
        elif pooling_type == 'max':
            self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 3)
        self.conv2_bn = nn.BatchNorm2d(16)
        if pooling_type == 'avg':
            self.pool = nn.AvgPool2d(2, 2)
        elif pooling_type == 'max':
            self.pool = nn.MaxPool2d(2, 2)
        self.dropout = nn.Dropout(0.5)

        self.fc1 = nn.Linear(115200, 4096)
        self.fc2 = nn.Linear(4096, 512)
        self.fc3 = nn.Linear(512, 256)
        self.fc4 = nn.Linear(256, self.n_classes)
        if activation_function == 'sigmoid':
            self.activation_function = F.sigmoid
        elif activation_function == 'softmax':
            self.activation_function = F.softmax
        elif activation_function == 'relu':
            self.activation_function = F.relu