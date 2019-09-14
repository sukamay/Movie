# -*- coding: utf-8 -*-


genre_list = ['剧情', '喜剧', '动作', '爱情', '科幻', '动画', '悬疑', '惊悚', '恐怖', '犯罪',
              '同性', '音乐', '歌舞', '历史', '战争', '西部', '奇幻', '冒险', '灾难', '武侠']

type_list = ['电影', '电视剧', '综艺', '动漫', '纪录片', '传记']

time_list = ['2019', '2018', '2010年代', '2000年代', '90年代', '80年代', '70年代', '60年代']

area_list = ['中国大陆', '美国', '香港', '台湾', '日本', '韩国', '英国', '法国', '德国', '意大利', '西班牙',
             '印度', '泰国', '俄罗斯', '伊朗', '加拿大', '澳大利亚', '爱尔兰', '瑞典', '巴西', '丹麦']


# def proc(item: dict):
#     split_chars = '/'
#     new_dict = dict()
#
#     titles = item['title'].split(' ')
#     new_dict['title_zh'] = titles[0]
#     new_dict['title_en'] = ' '.join(titles[1:])
#     new_dict['id'] = item['_id']
#     new_dict['poster'] = item['poster']
#     new_dict['countries'] = split_chars.join(item['countries'])
#     new_dict['directors'] = split_chars.join([_['name'] for _ in item['directors']])
#     new_dict['duration'] = item['duration']
#     new_dict['genres'] = split_chars.join(item['genres'])
#     new_dict['languages'] = split_chars.join(item['languages'])
#     new_dict['pubdate'] = item['pubdate'][0]
#     new_dict['average'] = item['rating']['average']
#     new_dict['rating_people'] = item['rating']['rating_people']
#     new_dict['stars'] = split_chars.join(item['rating']['stars'])
#     new_dict['summary'] = item['summary']
#     new_dict['year'] = item['year']
#     new_dict['casts'] = split_chars.join([_['name'] for _ in item['casts']])
#     new_dict['season_count'] = item['season_count']
#     new_dict['aka'] = split_chars.join(item['aka'])
#     new_dict['imdb'] = item['imdb']
#     new_dict['douban_site'] = item['douban_site']
#     new_dict['writers'] = split_chars.join([_['name'] for _ in item['writers']])
#     new_dict['lens_id'] = item['lens_id']
#     if new_dict['average'] == '':
#         new_dict['average'] = 0.0
#
#     return new_dict
#
#
# def load_jsons(request):
#     with open(os.getcwd() + '/static/js/films_clean.json', 'r') as file_obj:
#
#         temp_list = json.load(file_obj)
#         # temp_list = json.loads(temp_list).encode('utf-8')
#         # print(temp_list)
#
#         models_list = [Film(**proc(item)) for temp_id, item in enumerate(temp_list)]
#
#         # error solve
#         with open('error.txt', 'w') as error_id:
#             for item in models_list:
#                 if item.id == '1422097':
#                     print(item.countries)
#                     item.languages = '/'.join(item.languages.split('/')[0:5])
#                     item.countries = '/'.join(item.countries.split('/')[0:5])
#                 elif item.id == '2068301':
#                     pass
#                 elif item.id == '26582012':
#                     print(item.languages)
#                     item.languages = '/'.join(item.languages.split('/')[0:5])
#                 elif item.id == '1292754' or item.id == '2131678':
#                     print(item.casts)
#                     item.casts = '/'.join(item.casts.split('/')[0:8])
#                 elif item.id == '1308779':
#                     print(item.casts)
#                     item.casts = '/'.join(item.casts.split('/')[0:8])
#                 elif item.id == '1441189':
#                     pass
#                 elif item.id == '2068301' or item.id == '1440624':
#                     print(item.duration)
#                 elif item.id == '1308595':
#                     print(len(item.aka), item.aka)
#                     item.aka = '/'.join(item.aka.split('/')[0:5])
#                 else:
#                     continue
#
#                 # print('yes', item.id)
#                 try:
#                     item.save()
#                     print('yes', item.id)
#                 except Exception as e:
#                     if not e.__str__().startswith('(1062'):
#                         error_id.write(str(item.id) + e.__str__() + '\n')
#
#     return HttpResponse('Hello')
