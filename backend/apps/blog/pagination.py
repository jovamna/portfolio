from rest_framework.pagination import PageNumberPagination

#PAGINATTION DEL BLOG
class SmallSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 16
    page_size_query_param = 'page_size'
    max_page_size = 16


class MediumSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4


class LargeSetPagination(PageNumberPagination):
    page_query_param = 'p'
    page_size = 18
    page_size_query_param = 'page_size'
    max_page_size = 18