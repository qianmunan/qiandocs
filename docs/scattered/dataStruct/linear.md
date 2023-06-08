---
title: 线性表
---

# {{$frontmatter.title}} <img src="https://gaidocs.oss-cn-hangzhou.aliyuncs.com/emoji/202305101625732.png" width="46" height="46" alt="图片描述" style="display:inline; margin-bottom: -12px"/>

## 线性表的定义与运算

线性表是数据结构中的基本概念之一，指的是具有相同数据类型的n个元素的有限序列(a1, a2, ..., an)。其中，a1是线性表的第一个元素，an是线性表的最后一个元素，<font color='red'>除了第一个元素外，其他元素都有且只有一个直接前驱，除了最后一个元素外，其他元素都有且只有一个直接后继。</font>

线性表主要支持四种运算操作，包括插入、删除、查找和遍历:

1. 插入操作：将新的元素插入到线性表的指定位置，可以在顺序表中任意位置进行插入，而在链式表中则需要找到插入位置前一个节点，然后修改指针指向。

2. 删除操作：从线性表中删除指定位置的元素，可以在顺序表中通过覆盖待删除元素的方式实现，而在链式表中需要找到待删除节点的前一个节点，并修改前一个节点的指针指向后继节点。

3. 查找操作：查找线性表中某个元素在指定条件下是否存在，可以使用顺序查找或二分查找等算法，也可以在链式表中按照顺序遍历，依次比较每个节点的值，找到匹配的元素。

4. 遍历操作：遍历线性表中的所有元素，可以使用for、while循环等方法进行遍历。在顺序表中通过数组下标逐个取出所有元素，而在链式表中则需要依次访问每个节点。

线性表的运算操作是数据结构中最基础的操作之一，对于其他高级数据结构的实现都有重要作用。



## 线性表的顺序存储结构

线性表的顺序存储结构是指，将线性表中的元素按照其逻辑关系依次存放到一块连续的存储空间中。在该结构中，用一个一维数组来存储线性表中的所有元素，同时可以利用数组下标来表示各元素之间的逻辑关系。

具体来说，在线性表的顺序存储结构中，需要使用两个参数来描述该结构：

1. 存储空间的起始位置：即在线性表中第一个元素所在的物理存储位置；

2. 线性表的长度：即线性表中元素的个数。

在顺序存储结构中，我们可以通过数组下标访问任何一个数据元素，比如线性表中第i个元素的值可通过数组a[i-1]来得到，其中a为存储线性表的一维数组，因为数组下标从0开始。此外，由于数组在内存中是连续存储的，所以可以像处理普通数组一样，有效地利用计算机系统的缓存机制，提高程序性能。

但是，线性表的顺序存储结构也存在一些问题。当线性表中需要频繁插入或删除元素时，由于每次操作都要移动其他元素的位置，会导致操作效率很低。另外，如果线性表的长度不确定，而存储空间有限时，可能会造成存储空间的浪费或溢出等问题。

## 线性表的链式存储结构

线性表的链式存储结构是指，将线性表中的元素按照其逻辑关系使用一组任意的存储单元来存储，<font color='red'>每个存储单元包含两部分，即数据域和指针域。</font>数据域用来存储元素的值，指针域则用来指示下一个节点所在的存储单元地址，在链式结构中通常称为后继指针。通过这种方式，可将所有存储单元串联起来构成一个链表，实现线性表的存储。

具体来说，链表中的第一个节点称为头节点，通常不存储数据，只有后继指针；最后一个节点称为尾节点，其后继指针为空（或指向空节点）。而对于其他节点，则既有数据域又有指针域，其中指针域的值为该节点的后继节点地址。

相比于顺序存储结构，链式存储结构具有以下优点：

1. 能够动态管理内存，不需要事先为整个线性表分配固定大小的存储空间，避免了存储空间浪费和溢出问题；

2. 支持快速插入和删除操作，只需修改前驱节点和后继节点的指针即可，不需要像顺序存储结构那样移动元素；

3. 链表的长度没有限制，可以随时扩充或缩小，比较灵活。

不过链式存储结构也存在一些缺点，如访问链表中的任何一个节点需要遍历整个链表，所以相对于顺序结构，链式结构的访问速度较慢。而且由于每一个元素都需要一个指针域来记录其后继节点地址，因此会占用相对较多的存储空间。

### 单链表

链表是通过一组任意的存储单元来存储线性表中的元素

每一个节点中只有一个指向后继的指针，所以称其为单链表

单链表节点结构



结点结构定义

```c++
typedef int DataType;
class Item
{
    public:
    	DataType data;
    	Item* next;
    	Item(){next = NULL;}
};

class Link
{
    public:
    	Item *head; // 链表头指针
    	Link() {head = NULL;} // 构造函数
    	~Link() {DeleteAll();}  // 析构函数
    	void Initiate(); // 初始化
    	void DeleteAll(); // 删除所哟结点
    	void HeadCreate(int); // 从头建链表
    	void TailCreate(int); // 从尾建链表
    	void HeadCreateWithHead(int); // 建立带表头的链表 （从头）
    	void TailCreateWithHead(int); // 建立带表头的链表（从尾）
    	int length(); // 求表的长度
    	Item *Locatex(DataType x); // 查找值为x的数据元素
    	Item *Locatei(int i); // 查找第i个元素值
    	bool Insert(DataType x, int i); // 在链表第i个节点之前插入x
    	bool Deleted(int i); // 删除链表中第i个节点
    	void printAll(); // 打印链表
};
```



## 顺序表与链式表的比较

顺序表与链式表是两种常见的线性数据结构，它们都用来存储具有相同数据类型的元素的有限序列。它们之间最显著的差别在于其底层实现方式不同：

1. 底层实现： 顺序表使用一段连续的物理空间存储元素，通过下标直接访问；而链表则使用一组任意分散的、独立的节点进行存储，每个节点包含了存储元素的数据域和指向后继节点的指针域。

2. 动态性： 由于顺序表需要一开始就为其分配固定大小的连续存储空间，因此其容量不能动态增长或缩小；而链表则不受长度限制，可以随时扩展或收缩。

3. 存储效率： 由于顺序表中的元素是连续存储，访问时无需遍历整个线性表，在逻辑上距离较近的元素在物理上也比较靠近，所以它的访问速度相对较快；而链表中的元素需要通过指针互相连接起来，访问时必须从头节点逐步遍历至目标节点，访问效率相对较慢。

4. 插入删除的效率： 由于顺序表需要移动大量元素才能在中间位置插入或删除元素，所以其插入、删除操作效率较低；而链表仅需修改节点指针即可完成，效率更高。

因此，选择何种数据结构要根据应用场景具体来定。若存储的数据总量已知且固定，并且需要频繁随机访问，则宜选用顺序表；若存储数据的数量不确定，而需要频繁地增加、删除或查找，则应优先考虑链表。不过两者也经常会结合使用，如对于需要快速访问元素但同时也需要支持高性能插入和删除的情况，可以在顺序表上再加一个较小的链表实现索引。



## 算法应用举例

### 顺序表

以下是使用 C++ 实现顺序表的示例代码。在这个示例中，我们使用数组来实现顺序表结构，并通过类的形式封装相关操作。 

头文件：

```c++
#ifndef ARRAY_LIST_H
#define ARRAY_LIST_H

template <typename T>
class ArrayList {
private:
    int length;   // 当前数组长度
    int maxLength;  // 最大数组长度
    T* data;     // 存储数据的数组指针
public:
    ArrayList(int maxLen = 10);   // 构造函数
    ~ArrayList();   // 析构函数
    void push_back(T value);   // 在数组末尾添加元素
    void insert(int position, T value);   // 在指定位置插入元素
    void erase(int position);   // 删除指定位置的元素
    T& operator[](int index);   // 重载 [] 运算符，实现对顺序表的元素访问
    int size();   // 获取数组当前长度
    int capacity();   // 获取数组最大长度
    void printAll();   // 输出数组中所有元素
};

#endif
```

源文件：

```c++
#include <iostream>
#include "ArrayList.h"

using namespace std;

template<typename T>
ArrayList<T>::ArrayList(int maxLen) {   // 构造函数，初始化长度为0，最大长度为 maxLen 的空数组
    length = 0;
    maxLength = maxLen;
    data = new T[maxLength];
}

template<typename T>
ArrayList<T>::~ArrayList() {   // 析构函数，释放数组内存
    delete[] data;
}

template<typename T>
void ArrayList<T>::push_back(T value) {   // 在数组末尾添加元素
    if (length == maxLength) {   // 如果数组已满，扩展数组大小
        maxLength *= 2;
        T* newData = new T[maxLength];
        for (int i = 0; i < length; i++) {
            newData[i] = data[i];
        }
        delete[] data;
        data = newData;
    }
    data[length] = value;
    length++;
}

template<typename T>
void ArrayList<T>::insert(int position, T value) {   // 在指定位置插入元素
    if (position > length) {
        cout << "Invalid Position." << endl;
        return;
    }
    if (length == maxLength) {   //如果数组已满，扩展数组大小
        maxLength *= 2;
        T* newData = new T[maxLength];
        for (int i = 0; i < length; i++) {
            newData[i] = data[i];
        }
        delete[] data;
        data = newData;
    }
    for (int i = length; i > position; i--) {   // 将数组元素后移
        data[i] = data[i - 1];
    }
    data[position] = value;
    length++;
}

template<typename T>
void ArrayList<T>::erase(int position) {   // 删除指定位置的元素
    if (position >= length) {
        cout << "Invalid Position." << endl;
        return;
    }
    for (int i = position + 1; i < length; i++) {   // 将数组元素前移
        data[i - 1] = data[i];
    }
    length--;
}

template<typename T>
T& ArrayList<T>::operator[](int index) {   // 重载 [] 运算符，实现对顺序表的元素访问
    if (index >= length) {
        cout << "Invalid Index." << endl;
    }
    return data[index];
}

template<typename T>
int ArrayList<T>::size() {   // 获取数组当前长度
    return length;
}

template<typename T>
int ArrayList<T>::capacity() {   // 获取数组最大长度
    return maxLength;
}

template<typename T>
void ArrayList<T>::printAll() {   // 输出数组中所有元素
    for (int i = 0; i < length; i++) {
        cout << data[i] << " ";
    }
    cout << endl;
}
```

测试主函数：

```c++
#include "ArrayList.h"

int main() {
    ArrayList<int> list;
    cout << "Capacity: " << list.capacity() << ", Size: " << list.size() << endl;
    list.push_back(1);
    list.push_back(2);
    list.push_back(3);
    list.insert(1, 4);
    list.erase(2);
    list.printAll();
    cout << "Capacity: " << list.capacity() << ", Size: " << list.size() << endl;
    list[1] = 5;
    list.printAll();
    return 0;
}
vcpkg install fmt:x64-windows
```





在上述代码中，我们定义了一个 ArrayList 类，使用模板 T 来指示数组中存储的元素类型。该类包含了一些基本操作，例如在数组末尾添加元素、在指定位置插入元素、删除指定位置的元素、重载 [] 运算符进行元素访问等。我们还在构造函数中设置了最大长度为默认值 10 的空数组，并且实现了自动扩展数组大小的功能。最后，在 main 函数中测试了顺序表的一系列操作。



### 链表

以下是实现单链表的C++代码：

```cpp
#include <iostream>
using namespace std;

class Node {
public:
    int data;
    Node *next;
};

class LinkedList {
private:
    Node *head;
public:
    LinkedList() {
        head = NULL;
    }
    
    void add(int val) {
        Node *newNode = new Node();
        newNode->data = val;
        newNode->next = NULL;
        if(head == NULL) {
            head = newNode;
        } else {
            Node *temp = head;
            while(temp->next != NULL) {
                temp = temp->next;
            }
            temp->next = newNode;
        }
    }
    
    void display() {
        if(head == NULL) {
            cout << "List is empty!" << endl;
            return;
        }
        Node *temp = head;
        while(temp != NULL) {
            cout << temp->data << " ";
            temp = temp->next;
        }
        cout << endl;
    }
};

int main() {
    LinkedList list;
    list.add(1);
    list.add(2);
    list.add(3);
    list.display();
    return 0;
}
```

这里我们定义了两个类，`Node`类表示一个节点，包含一个整数值和指向下一个节点的指针；`LinkedList`类表示链表，包含一个头指针和一些操作函数。其中，`add()`方法用于添加新元素到末尾，`display()`方法打印链表中所有元素的值。在主函数中我们创建了一个链表对象，并添加了三个元素，最后打印链表中所有元素的值。



### 顺序表和链表的混合使用

以下是使用 C++ 实现顺序表和链表的混合使用，实现可扩展数组的示例代码。其中使用 vector 作为底层存储结构的顺序表，并设置了一个阈值 threshold，当数组元素数量超过该阈值时，将剩余元素存储到链式结构（LinkedList），用一个指针 lastNode 记录链表的最后一个节点。

```c++
#include <iostream>
#include <vector>

using namespace std;

template<typename T>
class LinkedList{
public:
    T data;
    LinkedList* next;
    LinkedList(T value){
        this->data = value;
        this->next = NULL;
    }
};

template<typename T>
class VectorList{
private:
    vector<T> data;  // 底层顺序表
    int threshold;   // 阈值
    LinkedList<T>* lastNode;  // 链表的最后一个节点
public:
    VectorList(){
        threshold = 10;     // 初始化阈值为10
        lastNode = NULL;
    }

    void push_back(T value){
        if(data.size() < threshold && lastNode == NULL){   // 如果底层顺序表未满且没有链表节点，则直接插入底层顺序表
            data.push_back(value);
        }else{     // 否则，在链式结构中添加新的节点
            LinkedList<T>* newNode = new LinkedList<T>(value);
            if(lastNode != NULL){    // 如果已有链表节点，则将新节点加入到最后一个节点之后
                lastNode->next = newNode;
            }else{     // 如果没有链表节点，则创建一个新链表
                lastNode = newNode;
            }
        }
    }

    T& operator[](int index){
        if(index < data.size()){
            return data[index];
        }else{   // 如果索引在链表中，则在链表中查找对应元素
            LinkedList<T>* curNode = lastNode;
            int curIndex = data.size();
            while(curIndex != index){
                curNode = curNode->next;
                curIndex++;
            }
            return curNode->data;
        }
    }

    void printAll(){
        for (int i = 0; i < data.size(); ++i)
        {
            cout<<data[i]<<" ";
        }
        LinkedList<T>* curNode = lastNode;
        while(curNode != NULL){   // 输出链表中的元素
            cout<<curNode->data<<" ";
            curNode = curNode->next;
        }
        cout<<endl;
    }

    int size(){
        return data.size() + getListNodeCount();
    }

    int getListNodeCount(){   // 获取链式结构中节点数目
        int count = 0;
        LinkedList<T>* curNode = lastNode;
        while(curNode != NULL){
            count++;
            curNode = curNode->next;
        }
        return count;
    }

};

int main()
{
    VectorList<int> vecList;
    vecList.push_back(1);
    vecList.push_back(2);
    vecList.push_back(3);
    vecList.push_back(4);
    vecList.push_back(5);
    vecList.push_back(6);
    vecList.push_back(7);
    vecList.push_back(8);
    vecList.push_back(9);
    vecList.push_back(10);
    vecList.push_back(11);
    vecList.push_back(12);
    vecList.push_back(13);

    cout<<"Array Size: "<<vecList.size()<<endl;
    vecList.printAll();

    vecList[6] = 100;   // 修改元素
    cout<<"Array Size: "<<vecList.size()<<endl;
    vecList.printAll();
}
```

在上述代码中，我们定义了一个 VectorList 类，其中使用 vector 来作为底层存储结构的顺序表，设置了阈值 threshold，当数组元素数量超过该阈值时，就将剩余元素存储在链式结构（LinkedList）中。同时，为了方便地访问顺序表和链表中的元素，我们在类中重载了运算符 []。如果索引小于底层顺序表的大小，则直接返回该位置对应的元素；否则，在链表结构中查找对应位置的元素并返回。

最后在 main 函数中，我们测试了添加元素、输出所有元素、获取数组长度、修改元素等功能。
